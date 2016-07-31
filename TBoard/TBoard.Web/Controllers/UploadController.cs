using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using TBoard.Web.Attributes;

namespace TBoard.Web.Controllers
{
    public class UploadController : Controller
    {
        //
        // GET: /Upload/
        [JWTTokenValidation]
        public ActionResult Index(int key)
        {
            using (TBoardEntities entities = new TBoardEntities())
            {

                var documentReq = entities.sps_GetOutstandingDocumentRequirements(key);

                UploadViewModel view = new UploadViewModel();
                view.OrganizationID = key;
                foreach (var req in documentReq)
                {
                    view.DocumentTypes.Add(req.documentTypeID.ToString(), string.Format("{0}-{1}",req.documentCode,req.documentDescription));
                }

                return View(view);
            }
        }

        [System.Web.Http.HttpPost]
        [JWTTokenValidation]
        public HttpResponseMessage PostForm()
        {
            var httpRequest = System.Web.HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = System.Web.HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    // NOTE: To store in memory use postedFile.InputStream

                    using (TBoardEntities entities = new TBoardEntities())
                    {
                        entities.documents.Add(new document()
                        {
                            organizationID = Convert.ToInt32(httpRequest.Form["OrganizationID"]),
                            dateCreated = DateTime.Now,
                            documentTypeID = Convert.ToInt32(httpRequest.Form["DocumentType"]),
                            documentPath = filePath
                        });
                        entities.SaveChanges();
                    }
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public class UploadViewModel
        {
            public Dictionary<string, string> DocumentTypes { get; set; }
            public int OrganizationID { get; set; }

            public UploadViewModel()
            {
                this.DocumentTypes = new Dictionary<string, string>();
            }
        }

    }
}
