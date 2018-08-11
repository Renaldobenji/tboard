using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using TBoard.Web.Models;
using TBoard.BusinessLogic.BusinessLogic;

namespace TBoard.Web.Controllers
{
    public class AdminFunctionController : Controller
    {
        private List<VerifyDocuments> verifyDocuments;

        private DocumentRequirementBusinessLogic documentRequirementBusinessLogic;
        private DocumentBusinessLogic documentBusinessLogic;
        ConfigBusinessLogic configBusinesslogic;
        public AdminFunctionController(DocumentRequirementBusinessLogic documentRequirementBusinessLogic, DocumentBusinessLogic documentBusinessLogic, ConfigBusinessLogic configBusinesslogic)
        {
            this.documentRequirementBusinessLogic = documentRequirementBusinessLogic;
            this.documentBusinessLogic = documentBusinessLogic;
            this.configBusinesslogic = configBusinesslogic;
        }

        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult VerifyDocuments()
        {
            verifyDocuments = new List<VerifyDocuments>()
            {
                new Models.VerifyDocuments()
                {
                    DocumentType = "DocumentType",
                    DocumentURL = "DocumentURL",
                    OrganizationID = 1,
                    OrganizationName = "OrganizationName",
                    Verified  = true
                },
                new Models.VerifyDocuments()
                {
                    DocumentType = "DocumentURL",
                    DocumentURL = "DocumentType",
                    OrganizationID = 1,
                    OrganizationName = "OrganizationName",
                    Verified  = false
                }
            };

            return View(verifyDocuments);
        }
    }
}
