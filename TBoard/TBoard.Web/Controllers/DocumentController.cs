using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Web.Attributes;

namespace TBoard.Web.Controllers
{
    public class DocumentController : ApiController
    {
        private DocumentRequirementBusinessLogic documentRequirementBusinessLogic;
        private DocumentBusinessLogic documentBusinessLogic;
        public DocumentController(DocumentRequirementBusinessLogic documentRequirementBusinessLogic, DocumentBusinessLogic documentBusinessLogic)
        {
            this.documentRequirementBusinessLogic = documentRequirementBusinessLogic;
            this.documentBusinessLogic = documentBusinessLogic;
        }

        // GET api/<controller>/5
        [JWTTokenValidation]
        [Route("api/Document/GetOutstandingRequirements/{organizationID}")]
        public HttpResponseMessage GetOutstandingRequirements(int organizationID)
        {
            var result = this.documentRequirementBusinessLogic.GetOutstandingDocumentRequirements(organizationID);

            var response = new
            {
                data = result
            };
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;

        }

        [Route("api/Document/{organizationID}")]
        [JWTTokenValidation]
        public HttpResponseMessage Get(int organizationID)
        {
            var result = this.documentBusinessLogic.FindBy(x => x.organizationID == organizationID).ToList();

            var documents = from x in result
                            select new
                                {
                                    documentID = x.documentID,
                                    documentTypeID = x.documentTypeID,
                                    documentTypeCode = x.documenttype.documentCode,
                                    documentDescription = x.documenttype.documentDescription,
                                    dateCreated = x.dateCreated
                                };

            var response = new
            {
                data = documents.ToList()
            };
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response, Formatting.None,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        // POST api/<controller>
        [HttpPost]
        [Route("api/Document/Upload")]
        [JWTTokenValidation]
        public HttpResponseMessage Upload()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    // NOTE: To store in memory use postedFile.InputStream
                }

                return Request.CreateResponse(HttpStatusCode.Created);
            }

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("", Formatting.None,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}