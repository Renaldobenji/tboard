using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;

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
        public void Post([FromBody]string value)
        {
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