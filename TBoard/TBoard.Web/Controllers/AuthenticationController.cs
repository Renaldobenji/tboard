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
using TBoard.Web.Helpers;
using TBoard.Web.Services;

namespace TBoard.Web.Controllers
{
    public class AuthenticationController : ApiController
    {
        private IAuthenticationService authService;
        private PasswordHasher passwordHasher;
        private UserBusinessLogic userBusinessLogic;
        private ConfigBusinessLogic configBusinessLogic;
        private OrganizationBusinessLogic organizationBusinessLogic;

        public AuthenticationController(IAuthenticationService authService, UserBusinessLogic userBusinessLogic, ConfigBusinessLogic configBusinessLogic, OrganizationBusinessLogic organizationBusinessLogic)
        {
            this.authService = authService;
            this.passwordHasher = new PasswordHasher();
            this.userBusinessLogic = userBusinessLogic;
            this.configBusinessLogic = configBusinessLogic;
            this.organizationBusinessLogic = organizationBusinessLogic;
        }        

        [HttpGet]
        [Route("api/Authentication/{username}/{password}")]
        public HttpResponseMessage Authenticate(string username, string password)
        {           
            var user = validateUser(username, password);
            
            if (user == null)
            {
                var errRe = new
                {
                    authenicated = "false",
                    errorMessage = "Username or Password Incorrect"
                };

                var errresp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(errRe, Formatting.None,
                                                    new JsonSerializerSettings
                                                    {
                                                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                    }))
                };

                errresp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                return errresp;
            }

            var userRoles = this.userBusinessLogic.GetRolesForUser(user.userID);
            var organization = getUserOganization(user.organizationID);
            var verified = false;
            var organizationName = "";
            if (organization != null)
            {
                verified = (organization.verified.HasValue ? true : false);
                organizationName = organization.name;
            }

            var plainTextSecurityKey = "Tboard Secret what do you mean 128 bits, i cant even spell that";
            var signingKey = new InMemorySymmetricSecurityKey(Encoding.UTF8.GetBytes(plainTextSecurityKey));
            var signingCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);

            string orgID = EncryptionHelper.Encrypt(user.organizationID.ToString());
            string userID = EncryptionHelper.Encrypt(user.userID.ToString());

            var claimsIdentity = new ClaimsIdentity(new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.username),
                new Claim(ClaimTypes.Name, user.firstname),
                new Claim(ClaimTypes.Surname, user.surname),
                new Claim("OrganizationID",orgID),
                new Claim("OrganizationName",organizationName),
                new Claim("Verified", verified.ToString()),
                new Claim("UserID",userID)
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
        }

        [HttpGet]
        [Route("api/Authentication/SwitchCompany/{userID}/{OrganizationID}")]
        public HttpResponseMessage SwitchCompany(string userID, string OrganizationID)
        {
            if (userID == null || OrganizationID == null)
            {
                var errRe = new
                {
                    authenicated = "false",
                    errorMessage = "Cannot perform action"
                };

                var errresp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(errRe, Formatting.None,
                                                    new JsonSerializerSettings
                                                    {
                                                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                    }))
                };

                errresp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                return errresp;
            }

            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(OrganizationID));
            int userpID = Convert.ToInt32(EncryptionHelper.Decrypt(userID));

            var user = this.userBusinessLogic.FindBy(x => x.userID == userpID && x.isApproved == true).FirstOrDefault();

            var userRoles = this.userBusinessLogic.GetRolesForUser((int)userpID);
            var organization = getUserOganization(orgID);
            var verified = false;
            var organizationName = "";
            if (organization != null)
            {
                verified = (organization.verified.HasValue ? true : false);
                organizationName = organization.name;
            }

            var plainTextSecurityKey = "Tboard Secret what do you mean 128 bits, i cant even spell that";
            var signingKey = new InMemorySymmetricSecurityKey(Encoding.UTF8.GetBytes(plainTextSecurityKey));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);

            var claimsIdentity = new ClaimsIdentity(new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.username),
                new Claim(ClaimTypes.Name, user.firstname),
                new Claim(ClaimTypes.Surname, user.surname),
                new Claim("OrganizationID",OrganizationID),
                new Claim("OrganizationName",organizationName),
                new Claim("Verified", verified.ToString()),
                new Claim("UserID",userID)
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
            var user = this.userBusinessLogic.FindBy(x => x.username == username && x.isApproved == true).FirstOrDefault();

            if (user == null)
                return null;

            bool userValidated = PasswordHasher.ValidatePassword(password, user.passwordSalt, user.password);

            if (userValidated)
                return user;
            else
                return null;
        }

        private organization getUserOganization(int? organizationID)
        {
            if (organizationID.HasValue == false)
                return null;

            return this.organizationBusinessLogic.FindBy(x => x.organizationID == organizationID).FirstOrDefault();
        }
    }
}
