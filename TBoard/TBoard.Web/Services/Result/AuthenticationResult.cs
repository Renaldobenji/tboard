using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TBoard.Web.Services.Result
{
    public class AuthenticationResult
    {
        public Boolean Authenticated { get; set; }
        public string AuthenticationErrorReason { get; set; }
    }
}