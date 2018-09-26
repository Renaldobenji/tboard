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
using TBoard.Web.Helpers;

namespace TBoard.Web.Controllers
{
    public class CorporateDetailsController : ApiController
    {
        private OrganizationBusinessLogic organizationBusinessLogic;
        private RequirementBusinessLogic requirementBusinessLogic;

        public CorporateDetailsController(OrganizationBusinessLogic organizationBusinessLogic, RequirementBusinessLogic requirementBusinessLogic)
        {
            this.organizationBusinessLogic = organizationBusinessLogic;
            this.requirementBusinessLogic = requirementBusinessLogic;
        }

        [HttpPost]
        public HttpResponseMessage Post(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("OrganizationID")));
            var companyType = formData.Get("CompanyType");
            var jointVenture = formData.Get("JointVenture");
            int numberOfDirTrusMembers = int.Parse(formData.Get("NumberOfDirTrusMembers"));
            var namesOfCompanyDirTrusMembers = formData.Get("NamesOfCompanyDirTrusMembers");
            int numberOfShareHolders = int.Parse(formData.Get("NumberOfShareHolders"));
            int numberOfEmployees = int.Parse(formData.Get("NumberOfEmployees"));

            this.organizationBusinessLogic.SaveMetaData(orgID, "CompanyType", companyType);

            this.organizationBusinessLogic.SaveMetaData(orgID, "JointVenture", jointVenture);
            if (jointVenture.ToUpper().Equals("JOINTVENTUREYES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "CORPORATEINFO", "JoinVentureDocuments");

            this.organizationBusinessLogic.SaveMetaData(orgID, "NumberOfDirTrusMembers", numberOfDirTrusMembers.ToString());
            this.organizationBusinessLogic.SaveMetaData(orgID, "NamesOfCompanyDirTrusMembers", namesOfCompanyDirTrusMembers);

            if(numberOfDirTrusMembers>0)
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "CORPORATEINFO", "DirectorsTrusteesMembersIDDocuments");

            this.organizationBusinessLogic.SaveMetaData(orgID, "NumberOfShareholders", numberOfShareHolders.ToString());

            if(numberOfShareHolders>0)
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "CORPORATEINFO", "ShareholderIDDocuments");

            this.organizationBusinessLogic.SaveMetaData(orgID, "NumberOfEmployees", numberOfEmployees.ToString());

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }
    }
}
