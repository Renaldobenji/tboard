using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model.Refactored;
using TBoard.Web.Attributes;
using TBoard.Web.Helpers;

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
        [JWTTokenValidation]
        [Route("api/Address/{ownerType}/{ownerID}")]
        public string Get(string ownerType, string ownerID)
        {
            string ownerIDs = EncryptionHelper.Decrypt(ownerID);

            List<address> allAddresses = this.addressBusinessLogic.FindBy(x => x.owningType == ownerType && x.owningID == ownerIDs).ToList();

            address address =
                this.addressBusinessLogic.FindBy(x => x.owningType == ownerType && x.owningID == ownerIDs)
                    .FirstOrDefault();

            return JsonConvert.SerializeObject(allAddresses, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        // POST api/<controller>
        [JWTTokenValidation]
        public void Post(FormDataCollection formData)
        {
            savePhysicalAddress(formData);
            savePostalAddress(formData);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        private void savePhysicalAddress(FormDataCollection formData)
        {
            address address = new address();

            string ownerIDs = EncryptionHelper.Decrypt(formData.Get("OrganizationID"));

            if (string.IsNullOrEmpty(formData.Get("AddressID")))
            {
                address.addressLine1 = formData.Get("AddressLine1");
                address.addressLine2 = formData.Get("AddressLine2");
                address.addressLine3 = formData.Get("AddressLine3");
                address.addressLine4 = formData.Get("AddressLine4");
                address.addressLine5 = formData.Get("AddressLine5");
                address.postalCode = formData.Get("PostalCode");
                address.owningType = "ORG";
                address.owningID = ownerIDs;
                address.addressTypeID = 1;//Physical Address
                this.addressBusinessLogic.Create(address);
            }
            else
            {

                int addressID = Convert.ToInt32(formData.Get("AddressID"));
                address = addressBusinessLogic.FindBy(x => x.addressID == addressID).FirstOrDefault();
                address.addressLine1 = formData.Get("AddressLine1");
                address.addressLine2 = formData.Get("AddressLine2");
                address.addressLine3 = formData.Get("AddressLine3");
                address.addressLine4 = formData.Get("AddressLine4");
                address.addressLine5 = formData.Get("AddressLine5");
                address.postalCode = formData.Get("PostalCode");
                this.addressBusinessLogic.Update(address);
            }
        }

        private void savePostalAddress(FormDataCollection formData)
        {
            address address = new address();

            string ownerIDs = EncryptionHelper.Decrypt(formData.Get("OrganizationID"));

            if (string.IsNullOrEmpty(formData.Get("PostalAddressID")))
            {
                address.addressLine1 = formData.Get("PostalAddressLine1");
                address.addressLine2 = formData.Get("PostalAddressLine2");
                address.addressLine3 = formData.Get("PostalAddressLine3");
                address.addressLine4 = formData.Get("PostalAddressLine4");
                address.addressLine5 = formData.Get("PostalAddressLine5");
                address.postalCode = formData.Get("PostalPostalCode");
                address.owningType = "ORG";
                address.owningID = ownerIDs;
                address.addressTypeID = 3;//Postal Address
                this.addressBusinessLogic.Create(address);
            }
            else
            {

                int addressID = Convert.ToInt32(formData.Get("PostalAddressID"));
                address = addressBusinessLogic.FindBy(x => x.addressID == addressID).FirstOrDefault();
                address.addressLine1 = formData.Get("PostalAddressLine1");
                address.addressLine2 = formData.Get("PostalAddressLine2");
                address.addressLine3 = formData.Get("PostalAddressLine3");
                address.addressLine4 = formData.Get("PostalAddressLine4");
                address.addressLine5 = formData.Get("PostalAddressLine5");
                address.postalCode = formData.Get("PostalPostalCode");
                this.addressBusinessLogic.Update(address);
            }
        }
    }
}