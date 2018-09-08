﻿using System;
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
using System.Net.Http.Headers;
using TBoard.Web.Helpers;

namespace TBoard.Web.Controllers
{
    public class OrganizationController : ApiController
    {
        private OrganizationBusinessLogic organizationBusinessLogic;
        RequirementBusinessLogic requirementBusinessLogic;
        // GET api/<controller>/5
        public OrganizationController(OrganizationBusinessLogic organizationBusinessLogic, RequirementBusinessLogic requirementBusinessLogic)
        {
            this.organizationBusinessLogic = organizationBusinessLogic;
            this.requirementBusinessLogic = requirementBusinessLogic;
        }

        [JWTTokenValidation]
        public string Get(string id)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(id));
            OrganizationDTO org = this.organizationBusinessLogic.GetOrganization(orgID);
            if (org == null)
                return "";

            return JsonConvert.SerializeObject(org, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        // POST api/<controller>
        [JWTTokenValidation]
        public void Post(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("OrganizationID")));

            organization org = this.organizationBusinessLogic.FindBy(x => x.organizationID == orgID).FirstOrDefault();
            org.name = formData.Get("Name");
            org.registrationNumber = formData.Get("RegistrationNumber");
            org.taxNumber = formData.Get("TaxNumber");
            org.tradingName = formData.Get("TradingName");
            org.vatNumber = formData.Get("VatNumber");
            org.oem = (formData.Get("oem").ToLower().Equals("true") ? true : false);
            this.organizationBusinessLogic.Update(org);
        }

        [JWTTokenValidation]
        [Route("api/Organization/Create")]
        public void CreateOrganization(FormDataCollection formData)
        {

            int userpID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("UserID")));

            organization org = new organization();
            org.name = formData.Get("Name");
            org.registrationNumber = formData.Get("RegistrationNumber");
            org.taxNumber = formData.Get("TaxNumber");
            org.tradingName = formData.Get("TradingName");
            org.vatNumber = formData.Get("VatNumber");
            org.oem = (formData.Get("oem").ToLower().Equals("true") ? true : false);
            this.organizationBusinessLogic.Create(org);

            this.organizationBusinessLogic.MapUserToOrganization(org.organizationID, userpID);
        }

        [JWTTokenValidation]
        [HttpGet]
        [Route("api/Organization/CustodianDetails/{organizationID}")]
        public HttpResponseMessage GetCustodianDetails(string organizationID)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(organizationID));

            var custodianDetail = this.organizationBusinessLogic.GetCustodianDetails(orgID).Take(1);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(custodianDetail))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/OrgInfo")]
        public HttpResponseMessage MetaDataOrgInfo(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var updateLetterHead = formData.Get("updateLetterHead");
            var updateCompanyProfile = formData.Get("updateCompanyProfile");
            var updateQuotationExample = formData.Get("updateQuotationExample");
            var updatePurchaseOrderExample = formData.Get("updatePurchaseOrderExample");
            var updateInvoiceExample = formData.Get("updateInvoiceExample");
            var updateSuppliersDocuments = formData.Get("updateSuppliersDocuments");
            var updateSuppliersCount = formData.Get("updateSuppliersCount");
            var updateRegisterShares = formData.Get("updateRegisterShares");
            var updateEmergencyStrikes = formData.Get("updateEmergencyStrikes");

            this.organizationBusinessLogic.SaveMetaData(orgID, "LetterHead", updateLetterHead);
            if (updateLetterHead.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ORGINFO", "LetterHead");
            }
            this.organizationBusinessLogic.SaveMetaData(orgID, "CompanyProfile", updateCompanyProfile);
            if (updateCompanyProfile.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ORGINFO", "CompanyProfile");
            }
            this.organizationBusinessLogic.SaveMetaData(orgID, "QuotationExample", updateQuotationExample);
            if (updateQuotationExample.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ORGINFO", "QuotationExample");
            }
            this.organizationBusinessLogic.SaveMetaData(orgID, "PurchaseOrderExample", updatePurchaseOrderExample);
            if (updatePurchaseOrderExample.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ORGINFO", "PurchaseOrderExample");
            }
            this.organizationBusinessLogic.SaveMetaData(orgID, "InvoiceExample", updateInvoiceExample);
            if (updateInvoiceExample.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ORGINFO", "InvoiceExample");
            }
            this.organizationBusinessLogic.SaveMetaData(orgID, "SuppliersDocuments", updateSuppliersDocuments);
            if (updateSuppliersDocuments.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ORGINFO", "SuppliersDocuments");
            }
            this.organizationBusinessLogic.SaveMetaData(orgID, "SuppliersCount", updateSuppliersCount);
            this.organizationBusinessLogic.SaveMetaData(orgID, "RegisterShares", updateRegisterShares);
            this.organizationBusinessLogic.SaveMetaData(orgID, "EmergencyStrikes", updateEmergencyStrikes);
            

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [Route("api/Organization/SaveCustodianDetails")]
        public void SaveCustodianDetails(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var custodianDetail = this.organizationBusinessLogic.GetCustodianDetails(orgID).FirstOrDefault();
            if (custodianDetail == null)
            {
                var custodian = new custodian();
                custodian.name = formData.Get("name");
                custodian.surname = formData.Get("surname");
                custodian.jobTitle = formData.Get("jobTitle");
                custodian.landline = formData.Get("landline");
                custodian.email = formData.Get("email");
                custodian.companyNumber = formData.Get("companyNumber");
                custodian.cell = formData.Get("cell");
                custodian.organizationID = Convert.ToInt32(formData.Get("organizationID"));
                this.organizationBusinessLogic.SaveCustodianDetails(custodian);
            }
            else
            {
                custodianDetail.name = formData.Get("name");
                custodianDetail.surname = formData.Get("surname");
                custodianDetail.jobTitle = formData.Get("jobTitle");
                custodianDetail.landline = formData.Get("landline");
                custodianDetail.email = formData.Get("email");
                custodianDetail.companyNumber = formData.Get("companyNumber");
                custodianDetail.cell = formData.Get("cell");
                this.organizationBusinessLogic.UpdateCustodianDetails(custodianDetail);
            }
        }

        [JWTTokenValidation]
        [HttpGet]
        [Route("api/Organization/GetUserOrganizations/{userID}")]
        public HttpResponseMessage GetUserOrganizations(string userID)
        {
            int userpID = Convert.ToInt32(EncryptionHelper.Decrypt(userID));

            var userOrg = this.organizationBusinessLogic.GetUserOrganiztions(userpID);
            userOrg.Insert(0, new organization()
            {
                name ="--Please Select Organization--",
                organizationID = -1                
            });

            var response = new
            {
                data = from x in userOrg
                       select new
                       {
                           Key = EncryptionHelper.Encrypt(x.organizationID.ToString()),
                           Name = x.name
                       }
            };


            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }
               
    }
}