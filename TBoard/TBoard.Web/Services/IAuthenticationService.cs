using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TBoard.Web.Services.Result;

namespace TBoard.Web.Services
{
    public interface IAuthenticationService
    {
        AuthenticationResult Authenticate(string username, string password);
    }
   
}