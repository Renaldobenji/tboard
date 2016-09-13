using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.BusinessLogic.Password;
using TBoard.Data.Model;
using TBoard.Web.Services;

namespace TBoard.Web.Controllers
{
    public class AuthenticationController : ApiController
    {
        private IAuthenticationService authService;
        private PasswordHasher passwordHasher;
        private UserBusinessLogic userBusinessLogic;
        private ConfigBusinessLogic configBusinessLogic;

        public AuthenticationController(IAuthenticationService authService, UserBusinessLogic userBusinessLogic, ConfigBusinessLogic configBusinessLogic)
        {
            this.authService = authService;
            this.passwordHasher = new PasswordHasher();
            this.userBusinessLogic = userBusinessLogic;
            this.configBusinessLogic = configBusinessLogic;
        }        

        [HttpGet]
        [Route("api/Authentication/{username}/{password}")]
        public HttpResponseMessage Authenticate(string username, string password)
        {           
            var user = validateUser(username, password);
            
            var userRoles = this.userBusinessLogic.GetRolesForUser(user.userID);

            var plainTextSecurityKey = "Tboard Secret what do you mean 128 bits, i cant even spell that";
            var signingKey = new InMemorySymmetricSecurityKey(Encoding.UTF8.GetBytes(plainTextSecurityKey));
            var signingCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);

            var claimsIdentity = new ClaimsIdentity(new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.username),
                new Claim(ClaimTypes.Name, user.firstname),
                new Claim(ClaimTypes.Surname, user.surname),
                new Claim("OrganizationID",user.organizationID.ToString()),
                new Claim("UserID",user.userID.ToString())
            }, "Custom");

            foreach (var roles in userRoles)
            {
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, roles.roleCode));
            }
            
            var securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                AppliesToAddress = "http://localhost",
                TokenIssuerName = "http://localhost",
                Subject = claimsIdentity,
                SigningCredentials = signingCredentials               
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var plainToken = tokenHandler.CreateToken(securityTokenDescriptor);
            var signedAndEncodedToken = tokenHandler.WriteToken(plainToken);

            // Console.WriteLine(plainToken.ToString());
            // Console.WriteLine(signedAndEncodedToken);   
            var response = new
            {
                authenicated = "true",
                errorMessage = "",
                data = signedAndEncodedToken
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response, Formatting.None,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
            //return signedAndEncodedToken;
            /*
            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidAudiences = new string[]
                {
                    "http://localhost"
                },
                ValidIssuers = new string[]
                {
                    "http://localhost"
                },
                IssuerSigningKey = signingKey
            };

            SecurityToken validatedToken;
            tokenHandler.ValidateToken(signedAndEncodedToken, tokenValidationParameters, out validatedToken);

            Console.WriteLine(validatedToken.ToString());
            Console.ReadLine();
            */

        }

        [HttpGet]
        [Route("api/Authentication/DocumentStorage")]        
        public HttpResponseMessage DocumentStorage()
        {

            try
            {
                var storageDetails = this.configBusinessLogic.GetConfigValue("StorageConnectionString");
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageDetails);

                // Create the blob client.
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

                // Retrieve reference to a previously created container.
                CloudBlobContainer container = blobClient.GetContainerReference("tboardblogcontainer");                

                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var guiidName = new Guid().ToString();                        

                        // Retrieve reference to a blob named "myblob".
                        CloudBlockBlob blockBlob = container.GetBlockBlobReference(guiidName);
                        // NOTE: To store in memory use postedFile.InputStream
                        blockBlob.UploadFromStream(httpRequest.Files[file].InputStream);

                        using (TBoardEntities entities = new TBoardEntities())
                        {
                            entities.documents.Add(new document()
                            {
                                organizationID = Convert.ToInt32(httpRequest.Form["OrganizationID"]),
                                dateCreated = DateTime.Now,
                                documentTypeID = Convert.ToInt32(httpRequest.Form["DocumentType"]),
                                documentPath = guiidName
                            });
                            entities.SaveChanges();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private user validateUser(string username, string password)
        {
            var user = this.userBusinessLogic.FindBy(x => x.username == username).FirstOrDefault();

            bool userValidated = PasswordHasher.ValidatePassword(password, user.passwordSalt, user.password);

            if (userValidated)
                return user;
            else
                return null;
        }
    }
}
