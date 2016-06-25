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

        public AuthenticationController(IAuthenticationService authService, UserBusinessLogic userBusinessLogic)
        {
            this.authService = authService;
            this.passwordHasher = new PasswordHasher();
            this.userBusinessLogic = userBusinessLogic;
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
                new Claim(ClaimTypes.Surname, user.surname)
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
