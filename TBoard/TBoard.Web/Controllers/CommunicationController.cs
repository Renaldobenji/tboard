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
                    addCommunicationBasedOnType(formData, orgID, "HomeNumber", "HME"); 
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
                    addCommunicationBasedOnType(formData, orgID, "CellNumber", "CELL");                   

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
                    addCommunicationBasedOnType(formData, orgID, "OfficeNumber", "WRK");
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
                    addCommunicationBasedOnType(formData, orgID, "Email", "EML");
                }
            }
        }

        private void addCommunicationBasedOnType(FormDataCollection formData, string orgID, string formField, string communicationType)
        {
            if (!string.IsNullOrEmpty(formData.Get(formField)))
            {
                this.addCommunication("ORG", orgID, formData.Get(formField), communicationType);
            }
        }

        private void addCommunication(string owingType, string owningID, string communicationLine1,
            string communicationType)
        {
            communication comm = new communication();
            comm.owningType = owingType;
            comm.owningID = owningID;
            comm.communicationLine1 = communicationLine1;
            if (communicationType.Equals("CELL"))
            {
                comm.communicationTypeID = 1;
            }
            else if (communicationType.Equals("WRK"))
            {
                comm.communicationTypeID = 2;
            }
            else if (communicationType.Equals("HME"))
            {
                comm.communicationTypeID = 3;
            }
            else if (communicationType.Equals("EML"))
            {
                comm.communicationTypeID = 4;
            }
            this.communicationBusinessLogic.Create(comm);
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