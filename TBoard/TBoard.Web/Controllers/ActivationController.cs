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
    public class ActivationController : Controller
    {
        //
        // GET: /Upload/
        [JWTTokenValidation]
        public ActionResult Index()
        {           

            using (TBoardEntities entities = new TBoardEntities())
            {
                string name = Request.QueryString["name"];
                var user = entities.users.Where(x => x.username == name).FirstOrDefault();
                user.isApproved = true;
                entities.SaveChanges();
                return View();
            }
        }
    }
}
