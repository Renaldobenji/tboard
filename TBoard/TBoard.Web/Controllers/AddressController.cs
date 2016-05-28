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
    public class AddressController : ApiController
    {
        private AddressBusinessLogic addressBusinessLogic;
        public AddressController(AddressBusinessLogic addressBusinessLogic)
        {
            this.addressBusinessLogic = addressBusinessLogic;
        }

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [Route("api/Address/{ownerType}/{ownerID}")]
        public string Get(string ownerType, string ownerID)
        {
            address address =
                this.addressBusinessLogic.FindBy(x => x.owningType == ownerType && x.owningID == ownerID)
                    .FirstOrDefault();

            return JsonConvert.SerializeObject(address, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        // POST api/<controller>
        public void Post(FormDataCollection formData)
        {
            int addressID = Convert.ToInt32(formData.Get("AddressID"));
            var address = addressBusinessLogic.FindBy(x => x.addressID == addressID).FirstOrDefault();
            address.addressLine1 = formData.Get("AddressLine1");
            address.addressLine2 = formData.Get("AddressLine2");
            address.addressLine3 = formData.Get("AddressLine3");
            address.addressLine4 = formData.Get("AddressLine4");
            address.addressLine5 = formData.Get("AddressLine5");
            address.postalCode = formData.Get("PostalCode");
            this.addressBusinessLogic.Update(address);
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