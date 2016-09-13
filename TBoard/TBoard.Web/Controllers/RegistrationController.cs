using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.BusinessLogic.Responses;
using TBoard.Data.Model;

namespace TBoard.Web.Controllers
{
    public class RegistrationController : ApiController
    {
        private CommunicationBusinessLogic communicationBusinessLogic;
        private AddressBusinessLogic addressBusinessLogic;
        private UserBusinessLogic userBusinessLogic;
        private OrganizationBusinessLogic organizationBusinessLogic;
        private EmailQueueBusinessLogic emailQueueBusinessLogic;

        public RegistrationController(CommunicationBusinessLogic communicationBusinessLogic, AddressBusinessLogic addressBusinessLogic, UserBusinessLogic userBusinessLogic, OrganizationBusinessLogic organizationBusinessLogic, EmailQueueBusinessLogic emailQueueBusinessLogic)
        {
            this.communicationBusinessLogic = communicationBusinessLogic;
            this.addressBusinessLogic = addressBusinessLogic;
            this.userBusinessLogic = userBusinessLogic;
            this.organizationBusinessLogic = organizationBusinessLogic;
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
        }
        // POST api/<controller>
        public string Post(FormDataCollection formData)
        {
            UserResponse userResponse = null;
            organization org = null;
            try
            {

                //Create Organization first
                if (!string.IsNullOrEmpty(formData.Get("OrganizationName")))
                {
                    if (formData.Get("RegistrationType").Equals("CorporateBuyer"))
                    {
                        org = new organization();
                        org.name = formData.Get("OrganizationName");
                        org.organizationTypeID = 1;
                        this.organizationBusinessLogic.Create(org);
                    }
                    else if (formData.Get("RegistrationType").Equals("CorporateSeller"))
                    {
                        org = new organization();
                        org.name = formData.Get("OrganizationName");
                        org.organizationTypeID = 2;
                        this.organizationBusinessLogic.Create(org);
                    } 
                }

                if (org == null)
                {
                    userResponse = userBusinessLogic.CreateUser(formData.Get("Name"), formData.Get("Name"),
                        formData.Get("Surname"), formData.Get("Password"), "Mr", formData.Get("IDNumber"));
                }
                else
                {
                    userResponse = userBusinessLogic.CreateUser(formData.Get("Name"), formData.Get("Name"),
                        formData.Get("Surname"), formData.Get("Password"), "Mr", formData.Get("IDNumber"),
                        org.organizationID, "", "");
                }

                //Address Information
                this.addAddressInformation(formData, org, userResponse);

                //Communication
                addCommunicationBasedOnType(formData, org, userResponse, "CellNumber", "CELL");
                addCommunicationBasedOnType(formData, org, userResponse, "HomeNumber", "HME");
                addCommunicationBasedOnType(formData, org, userResponse, "OfficeNumber", "WRK");
                addCommunicationBasedOnType(formData, org, userResponse, "Email", "EML");                               

                this.emailQueueBusinessLogic.SendEmail("admin@Tenderboard.co.za", formData.Get("Email"), "Registration Complete", createEmailBody(formData.Get("Name"), formData.Get("Password")));
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            return "";
        }

        private string createEmailBody(string username, string password)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/registration.html")))
            {

                body = reader.ReadToEnd();
            }

            body = body.Replace("{username}", username); //replacing the required things     
            body = body.Replace("{password}", password); //replacing the required things            

            return body;
        }

        private void addAddressInformation(FormDataCollection formData, organization org, UserResponse userResponse)
        {
            address address = new address();
            address.addressLine1 = formData.Get("AddressLine1");
            address.addressLine2 = formData.Get("AddressLine2");
            address.addressLine3 = formData.Get("AddressLine3");
            address.addressLine4 = formData.Get("AddressLine4");
            address.addressLine5 = formData.Get("AddressLine5");
            address.postalCode = formData.Get("PostalCode");

            if (org != null)
            {
                address.owningType = "ORG";
                address.owningID = org.organizationID.ToString();
                address.addressTypeID = 1;//Physical Address
                this.addressBusinessLogic.Create(address);
            }

            address.owningType = "PER";
            address.owningID = userResponse.UserID.ToString();
            address.addressTypeID = (org == null ? 1 : 2);
            this.addressBusinessLogic.Create(address);
        }

        private void addCommunicationBasedOnType(FormDataCollection formData, organization org, UserResponse userResponse, string formField, string communicationType)
        {
            if (!string.IsNullOrEmpty(formData.Get(formField)))
            {
                if (org != null)
                {
                    this.addCommunication("ORG", org.organizationID.ToString(), formData.Get(formField), communicationType);
                }
                this.addCommunication("PER", userResponse.UserID.ToString(), formData.Get(formField), communicationType);
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


    }
}