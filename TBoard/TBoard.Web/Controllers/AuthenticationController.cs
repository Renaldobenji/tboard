using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using TBoard.Web.Services;

namespace TBoard.Web.Controllers
{
    public class AuthenticationController : ApiController
    {
        private IAuthenticationService authService;

        public AuthenticationController(IAuthenticationService authService)
        {
            this.authService = authService;
        }

        [HttpGet]
        [Route("api/Authentication/{username}/{password}")]
        public void Authenticate(string username, string password)
        {
            var plainTextSecurityKey = "Tboard Secret what do you mean 128 bits, i cant even spell that";
            var signingKey = new InMemorySymmetricSecurityKey(Encoding.UTF8.GetBytes(plainTextSecurityKey));
            var signingCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);

            var claimsIdentity = new ClaimsIdentity(new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, "admin@tboard.com"),
                new Claim(ClaimTypes.Role, "Administrator")
            }, "Custom");

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

            Console.WriteLine(plainToken.ToString());
            Console.WriteLine(signedAndEncodedToken);
                       

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

        }
    }
}
