using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using TBoard.Web.Attributes;


namespace TBoard.Web.Controllers
{
    public class ContactController : Controller
    {
        //
        // GET: /Upload/
        [JWTTokenValidation]
        public ActionResult Index()
        {
            return View();
        }
    }
}
