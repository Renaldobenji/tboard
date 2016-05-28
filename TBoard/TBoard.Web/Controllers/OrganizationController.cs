using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;

namespace TBoard.Web.Controllers
{
    public class OrganizationController : ApiController
    {
        private OrganizationBusinessLogic organizationBusinessLogic;
        // GET api/<controller>/5
        public OrganizationController(OrganizationBusinessLogic organizationBusinessLogic)
        {
            this.organizationBusinessLogic = organizationBusinessLogic;
        }
        public string Get(int id)
        {
            organization org = this.organizationBusinessLogic.FindBy(x => x.organizationID == id).FirstOrDefault();
            if (org == null)
                return "";

            return JsonConvert.SerializeObject(org, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        // POST api/<controller>
        public void Post(FormDataCollection formData)
        {
            int organizationID = Convert.ToInt32(formData.Get("OrganizationID"));

            organization org = this.organizationBusinessLogic.FindBy(x => x.organizationID == organizationID).FirstOrDefault();
            org.name = formData.Get("Name");
            org.registrationNumber = formData.Get("RegistrationNumber");
            org.taxNumber = formData.Get("TaxNumber");
            org.tradingName = formData.Get("TradingName");
            org.vatNumber = formData.Get("VatNumber");
            this.organizationBusinessLogic.Update(org);
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