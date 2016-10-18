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
using TBoard.Web.Attributes;

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
        [Route("api/Communication/{ownerType}/{ownerID}")]
        public string Get(string ownerType, string ownerID)
        {
            var home =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerID &&
                        x.communicationtype.communicationTypeTLA == "HME").FirstOrDefault()?.communicationLine1;

            var cell =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerID &&
                        x.communicationtype.communicationTypeTLA == "CELL").FirstOrDefault()?.communicationLine1;

            var work =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerID &&
                        x.communicationtype.communicationTypeTLA == "WRK").FirstOrDefault()?.communicationLine1;

            var email =
                this.communicationBusinessLogic.FindBy(
                    x =>
                        x.owningType == ownerType && x.owningID == ownerID &&
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

        // POST api/<controller>
        [JWTTokenValidation]
        public void PostOrganization(FormDataCollection formData)
        {
            var orgID = formData.Get("OrganizationID");
            var ownerType = formData.Get("OwnerType");
            if (!String.IsNullOrEmpty(formData.Get("HomeNumber")))
            {
                var homeContact =
                    this.communicationBusinessLogic.FindBy(
                        x =>
                            x.owningType == ownerType && x.owningID == orgID &&
                            x.communicationtype.communicationTypeTLA == "HME").FirstOrDefault();
                if (homeContact != null)
                {
                    homeContact.communicationLine1 = formData.Get("HomeNumber");
                    this.communicationBusinessLogic.Update(homeContact);
                }
                else
                {
                    homeContact.communicationLine1 = formData.Get("HomeNumber");
                    homeContact.communicationtype.communicationTypeTLA = "HME";
                    homeContact.owningType = formData.Get("OwnerType");
                    homeContact.owningID = formData.Get("OrganizationID");

                }
            }

            if (!String.IsNullOrEmpty(formData.Get("CellNumber")))
            {
                var CellContact =
                    this.communicationBusinessLogic.FindBy(
                        x =>
                            x.owningType == ownerType && x.owningID == orgID &&
                            x.communicationtype.communicationTypeTLA == "CELL").FirstOrDefault();
                if (CellContact != null)
                {
                    CellContact.communicationLine1 = formData.Get("CellNumber");
                    this.communicationBusinessLogic.Update(CellContact);
                }
                else
                {
                    CellContact.communicationLine1 = formData.Get("CellNumber");
                    CellContact.communicationtype.communicationTypeTLA = "CELL";
                    CellContact.owningType = formData.Get("OwnerType");
                    CellContact.owningID = formData.Get("OrganizationID");

                }
            }

            if (!String.IsNullOrEmpty(formData.Get("OfficeNumber")))
            {
                var WorkContact =
                    this.communicationBusinessLogic.FindBy(
                        x =>
                            x.owningType == ownerType && x.owningID == orgID &&
                            x.communicationtype.communicationTypeTLA == "WRK").FirstOrDefault();
                if (WorkContact != null)
                {
                    WorkContact.communicationLine1 = formData.Get("OfficeNumber");
                    this.communicationBusinessLogic.Update(WorkContact);
                }
                else
                {
                    WorkContact.communicationLine1 = formData.Get("OfficeNumber");
                    WorkContact.communicationtype.communicationTypeTLA = "WRK";
                    WorkContact.owningType = formData.Get("OwnerType");
                    WorkContact.owningID = formData.Get("OrganizationID");

                }
            }
            if (!String.IsNullOrEmpty(formData.Get("Email")))
            {
                var EmailContact =
                    this.communicationBusinessLogic.FindBy(
                        x =>
                            x.owningType == ownerType && x.owningID == orgID &&
                            x.communicationtype.communicationTypeTLA == "EML").FirstOrDefault();
                if (EmailContact != null)
                {
                    EmailContact.communicationLine1 = formData.Get("Email");
                    this.communicationBusinessLogic.Update(EmailContact);
                }
                else
                {
                    EmailContact.communicationLine1 = formData.Get("Email");
                    EmailContact.communicationtype.communicationTypeTLA = "EML";
                    EmailContact.owningType = formData.Get("OwnerType");
                    EmailContact.owningID = formData.Get("OrganizationID");

                }
            }
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