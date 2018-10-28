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
    public class CommunicationController : ApiController
    {
        private CommunicationBusinessLogic communicationBusinessLogic;
        public CommunicationController(CommunicationBusinessLogic communicationBusinessLogic)
        {
            this.communicationBusinessLogic = communicationBusinessLogic;
        }

        // GET api/<controller>/5
        [JWTTokenValidation]
        [Route("api/Communication/{ownerType}/{ownerID}/{communicationID}")]
        public string Get(string ownerType, string ownerID, string communicationID)
        {
            string ownerIDs = EncryptionHelper.Decrypt(ownerID);


            var home =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerIDs &&
                        x.communicationtype.communicationTypeTLA == "HME").FirstOrDefault()?.communicationLine1;

            var cell =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerIDs &&
                        x.communicationtype.communicationTypeTLA == "CELL").FirstOrDefault()?.communicationLine1;

            var work =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerIDs &&
                        x.communicationtype.communicationTypeTLA == "WRK").FirstOrDefault()?.communicationLine1;

            var email =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerIDs &&
                        x.communicationtype.communicationTypeTLA == "EML").FirstOrDefault()?.communicationLine1;


            var com = new
            {
                Home = home,
                CellPhone = cell,
                WorkPhone = work,
                Email = email,
            };

            return JsonConvert.SerializeObject(com, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        [JWTTokenValidation]
        [Route("api/Communication/{ownerType}/{ownerID}")]
        public string Get(string ownerType, string ownerID)
        {
            string ownerIDs = EncryptionHelper.Decrypt(ownerID);
            var comm = this.communicationBusinessLogic.GetCommunication(ownerType, ownerIDs);

            return JsonConvert.SerializeObject(comm, Formatting.Indented,
                                               new JsonSerializerSettings
                                               {
                                                   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                               });
        }

        // POST api/<controller>
        [JWTTokenValidation]
        [Route("api/Communication/{ownerType}/{ownerID}")]
        public void PostOrganization(FormDataCollection formData,string ownerType,string ownerID)
        {
            string decryptedOwnerID = EncryptionHelper.Decrypt(ownerID);
            saveCommunication(formData, ownerType, decryptedOwnerID);
        }

        private void saveCommunication(FormDataCollection formData, string ownerType, string ownerIDs)
        {
            var role = formData.Get("ContactRole");

            var homePhoneNumber = formData.Get("HomeNumber");
            var cellphoneNumber = formData.Get("CellNumber");
            var officeNumber = formData.Get("OfficeNumber");
            var emailAddress = formData.Get("Email");

            communicationBusinessLogic.SaveCommunication(ownerType, ownerIDs, "HME", homePhoneNumber, role);
            communicationBusinessLogic.SaveCommunication(ownerType, ownerIDs, "CELL", cellphoneNumber, role);
            communicationBusinessLogic.SaveCommunication(ownerType, ownerIDs, "WRK", officeNumber, role);
            communicationBusinessLogic.SaveCommunication(ownerType, ownerIDs, "EML", emailAddress, role);
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