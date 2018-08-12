using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using TBoard.Web.Models;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;
using Unity.WebApi;
using TBoard.Web.Services;
using TBoard.Web.Controllers;
using System.Net.Http.Formatting;
using System.IO;

namespace TBoard.Web.Controllers
{
    public class AdminFunctionController : Controller
    {
        private List<VerifyDocuments> verifyDocuments;

        private DocumentRequirementBusinessLogic documentRequirementBusinessLogic;
        private DocumentBusinessLogic documentBusinessLogic;
        ConfigBusinessLogic configBusinesslogic;
        private TBoardEntities entities;
        public AdminFunctionController()
        {
            entities = new TBoardEntities();          
            this.documentBusinessLogic = new DocumentBusinessLogic(new UnitOfWork(entities),new DocumentRepository(entities));
            this.configBusinesslogic = new ConfigBusinessLogic(new UnitOfWork(entities),new ConfigRepository(entities)); 
        }
    

        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult VerifyDocuments()
        {

            verifyDocuments = documentBusinessLogic.GetUnverifiedDocuments().Select(x => new VerifyDocuments()
            {
                DocumentType = x.documenttype,
                DocumentID = x.documentID.ToString(),
                OrganizationID = x.organizationID,
                OrganizationName = x.organizationName,
                DocumentURL = x.documentID.ToString(),
                Verified = x.verified
            }).ToList();            

            return View(verifyDocuments);
        }

        public class VerifyDocumentViewModel
        {
            public string DocumentID { get; set; }
        }

        [System.Web.Http.HttpPost]
        public ActionResult VerifyDocument(VerifyDocumentViewModel formData)
        {
            int documentID = Convert.ToInt32(formData.DocumentID);
            var result = this.documentBusinessLogic.VerifyDocument(documentID);


            return Redirect("VerifyDocuments");
        }

        [System.Web.Http.HttpPost]
        public FileStreamResult DownloadDocument(VerifyDocumentViewModel formData)
        {
            string storageDetails;
            using (TBoardEntities entities = new TBoardEntities())
            {
                storageDetails = entities.configs.Where(x => x.name == "StorageConnectionString").Select(y => y.value).FirstOrDefault();
            }


            int documentID = Convert.ToInt32(formData.DocumentID);
            var result = this.documentBusinessLogic.GetDocument(documentID);

            FileStream fs = new FileStream(storageDetails + result, FileMode.Open, FileAccess.Read);
            return File(fs, "application/octet-stream", result);

            
        }


    }
}
