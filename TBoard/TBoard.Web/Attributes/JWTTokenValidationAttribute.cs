using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace TBoard.Web.Attributes
{   

    public class JWTTokenValidationAttribute : ActionFilterAttribute
    {
        public string Roles { get; set; }
        public string OrganizationID { get; set; }
        public string UserID { get; set; }

        public JWTTokenValidationAttribute()
        {
            
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            try
            {
                var jwtToken = actionContext.Request.Headers.GetValues("Cookie").FirstOrDefault().Split('=')[1];

                var plainTextSecurityKey = "Tboard Secret what do you mean 128 bits, i cant even spell that";
                var signingKey = new InMemorySymmetricSecurityKey(Encoding.UTF8.GetBytes(plainTextSecurityKey));
                var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);

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
                var tokenHandler = new JwtSecurityTokenHandler();
                var claimsCollection = tokenHandler.ValidateToken(jwtToken, tokenValidationParameters, out validatedToken);

                OrganizationID = claimsCollection.FindFirst("OrganizationID").Value;
                UserID = claimsCollection.FindFirst("UserID").Value;

                HttpContext.Current.Request.Headers.Add("OrganizationID", OrganizationID);
                HttpContext.Current.Request.Headers.Add("UserID", UserID);

                if (!String.IsNullOrEmpty(Roles))
                { 
                    bool isInRole = claimsCollection.IsInRole(Roles);
                    if (isInRole == false)
                    {
                        actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
                    }
                }
            }
            catch (Exception ex)
            {
                //actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
            }            
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            
        }
    }
}