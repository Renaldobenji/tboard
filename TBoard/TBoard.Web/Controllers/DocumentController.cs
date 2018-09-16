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
using System.Net.Http.Formatting;
using TBoard.Web.Helpers;

namespace TBoard.Web.Controllers
{
    public class DocumentController : ApiController
    {
        private DocumentRequirementBusinessLogic documentRequirementBusinessLogic;
        private DocumentBusinessLogic documentBusinessLogic;
        ConfigBusinessLogic configBusinesslogic;
        public DocumentController(DocumentRequirementBusinessLogic documentRequirementBusinessLogic, DocumentBusinessLogic documentBusinessLogic, ConfigBusinessLogic configBusinesslogic)
        {
            this.documentRequirementBusinessLogic = documentRequirementBusinessLogic;
            this.documentBusinessLogic = documentBusinessLogic;
            this.configBusinesslogic = configBusinesslogic;
        }

        // GET api/<controller>/5
        [JWTTokenValidation]
        [Route("api/Document/GetOutstandingRequirements/{organizationID}")]
        public HttpResponseMessage GetOutstandingRequirements(string organizationID)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(organizationID));

            var result = this.documentRequirementBusinessLogic.GetOutstandingDocumentRequirements(orgID);

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

        [JWTTokenValidation]
        [Route("api/Document/GetOrganizationDocuments")]
        public HttpResponseMessage GetOrganizationDocuments()
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(HttpContext.Current.Request.Headers["OrganizationID"]));

            var result = this.documentBusinessLogic.GetOrganizationDocuments(orgID);

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


        [Route("api/Document")]
        [JWTTokenValidation]
        public HttpResponseMessage Get()
        {

            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(HttpContext.Current.Request.Headers["OrganizationID"]));
           
            var result = this.documentBusinessLogic.FindBy(x => x.organizationID == orgID).ToList();

            var documents = from x in result
                            select new
                                {
                                    documentID = x.documentID,
                                    documentTypeID = x.documentTypeID,
                                    documentTypeCode = x.documenttype.documentCode,
                                    documentDescription = x.documenttype.documentDescription,
                                    dateCreated = x.dateCreated,
                                    expiryDate = x.expiryDate,
                                    verified = (x.verified != null ? "TRUE" : "FALSE")

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
                    var filePath = this.configBusinesslogic.GetConfigValue("TBoardPath") + postedFile.FileName;
                    postedFile.SaveAs(filePath);                    
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

        
        [HttpPost]
        [JWTTokenValidation]
        [Route("api/Document/VerifyDocument")]
        public HttpResponseMessage VerifyDocument(FormDataCollection formData)
        {
            int documentID = Convert.ToInt32(formData.Get("documentID"));
            var result = this.documentBusinessLogic.VerifyDocument(documentID);

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