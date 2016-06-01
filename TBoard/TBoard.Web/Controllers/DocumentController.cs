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
            var result = this.documentBusinessLogic.FindBy(x => x.organizationID == organizationID);

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