using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using TBoard.Web.Attributes;

namespace TBoard.Web.Controllers
{
    public class RequirementController : ApiController
    {

        private RequirementBusinessLogic requirementBusinessLogic;
        public RequirementController(RequirementBusinessLogic requirementBusinessLogic)
        {
            this.requirementBusinessLogic = requirementBusinessLogic;
        }

        // GET api/<controller>/5
        [Route("api/Requirement/{requirementType}/{ownerType}/{ownerID}")]
        [JWTTokenValidation]
        public HttpResponseMessage Get(string requirementType, string ownerType, string ownerID)
        {
            var requirements = this.requirementBusinessLogic.FindBy(x => x.owningType == ownerType && x.owningID == ownerID && x.requirementTypeCode == requirementType).Select((y) => new RequirementsDTO()
            {
                CreatedDate = y.date.ToString(),
                RequirementName = y.metaData,
                RequirementType = y.requirementTypeCode,
                ResolvedDate = y.resolved.ToString(),
                OrgID = ownerID
            }).ToList();


            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(requirements))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }
    }
}