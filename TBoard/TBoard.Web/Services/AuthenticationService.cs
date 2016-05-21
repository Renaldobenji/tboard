using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TBoard.Web.Services.Result;

namespace TBoard.Web.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        public Result.AuthenticationResult Authenticate(string username, string password)
        {
            AuthenticationResult result = new AuthenticationResult();

            result.Authenticated = false;
            result.AuthenticationErrorReason = "You must have got something wrong";

            return result;
        }
    }
}