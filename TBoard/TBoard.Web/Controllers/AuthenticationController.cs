using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    }
}
