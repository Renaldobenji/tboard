using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
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

        public RegistrationController(CommunicationBusinessLogic communicationBusinessLogic, AddressBusinessLogic addressBusinessLogic, UserBusinessLogic userBusinessLogic, OrganizationBusinessLogic organizationBusinessLogic)
        {
            this.communicationBusinessLogic = communicationBusinessLogic;
            this.addressBusinessLogic = addressBusinessLogic;
            this.userBusinessLogic = userBusinessLogic;
            this.organizationBusinessLogic = organizationBusinessLogic;
        }
        // POST api/<controller>
        public string Post(FormDataCollection formData)
        {
            UserResponse userResponse = null;
            organization org = null;

            //Create Organization first
            if (!string.IsNullOrEmpty(formData.Get("OrganizationName")))
            {
                if (formData.Get("OrganizationName").Equals("Company Buyer"))
                {
                    org = new organization();
                    org.name = formData.Get("OrganizationName");
                    org.organizationTypeID = 1;
                }
                else if (formData.Get("OrganizationName").Equals("Company Buyer"))
                {
                    org = new organization();
                    org.name = formData.Get("OrganizationName");
                    org.organizationTypeID = 2;
                }
                if (org != null)
                    this.organizationBusinessLogic.Create(org);
            }

            if (org == null)
            {
                userResponse = userBusinessLogic.CreateUser(formData.Get("Name"), formData.Get("Name"),
                    formData.Get("Surname"), formData.Get("Password"), formData.Get("Title"), formData.Get("IDNumber"));
            }
            else
            {
                userResponse = userBusinessLogic.CreateUser(formData.Get("Name"), formData.Get("Name"),
                    formData.Get("Surname"), formData.Get("Password"), formData.Get("Title"), formData.Get("IDNumber"),
                    org.organizationID);
            }

            //Address Information
            this.addAddressInformation(formData, org, userResponse);

            //Communication
            addCommunicationBasedOnType(formData, org, userResponse, "CellNumber", "CELL");
            addCommunicationBasedOnType(formData, org, userResponse, "HomeNumber", "HME");
            addCommunicationBasedOnType(formData, org, userResponse, "OfficeNumber", "WRK");
            addCommunicationBasedOnType(formData, org, userResponse, "Email", "EML");

            return "";
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