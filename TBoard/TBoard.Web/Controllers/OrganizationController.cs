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
using System.Net.Http.Headers;
using TBoard.Web.Helpers;
using TBoard.Web.Models;

namespace TBoard.Web.Controllers
{
    public class OrganizationController : ApiController
    {
        private OrganizationBusinessLogic organizationBusinessLogic;
        private RequirementBusinessLogic requirementBusinessLogic;
        private MetaDataBusinessLogic metaDataBusinessLogic;
        private OrganizationWeightingBusinessLogic organizationWeightingBusinessLogic;
        private ConfigBusinessLogic configBusinessLogic;

        // GET api/<controller>/5
        public OrganizationController(OrganizationBusinessLogic organizationBusinessLogic, RequirementBusinessLogic requirementBusinessLogic, 
            MetaDataBusinessLogic metaDataBusinessLogic,OrganizationWeightingBusinessLogic organizationWeightingBusinessLogic, ConfigBusinessLogic configBusinessLogic)
        {
            this.organizationBusinessLogic = organizationBusinessLogic;
            this.requirementBusinessLogic = requirementBusinessLogic;
            this.metaDataBusinessLogic = metaDataBusinessLogic;
            this.organizationWeightingBusinessLogic = organizationWeightingBusinessLogic;
            this.configBusinessLogic = configBusinessLogic;
        }

        [JWTTokenValidation]
        public string Get(string id)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(id));

            OrganizationDTO org = this.organizationBusinessLogic.GetOrganization(orgID);
            org.organizationID = id;

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

            if (!string.IsNullOrEmpty(formData.Get("PayeNumber")))
            {
                this.organizationBusinessLogic.SaveMetaData(orgID, "PayeNumber", formData.Get("PayeNumber"));
            }

            if (!string.IsNullOrEmpty(formData.Get("CIODCertificateNumber")))
            {
                this.organizationBusinessLogic.SaveMetaData(orgID, "CIODCertificateNumber", formData.Get("CIODCertificateNumber"));
            }
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

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "OrgInfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "ORGINFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
                new FetchMetaData() { OwnerID = orgID.ToString(), MetaDataNames = new List<string>() { "LetterHead", "CompanyProfile", "QuotationExample", "PurchaseOrderExample", "InvoiceExample"
                , "SuppliersDocuments" , "SuppliersCount" , "RegisterShares" , "EmergencyStrikes"} }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("organizationInfo", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/HRInfo")]
        public HttpResponseMessage MetaDataHRInfo(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var companyOrganogram = formData.Get("companyOrganogram");
            var employmentEquityPolicy = formData.Get("employmentEquityPolicy");
            var employmentEquityReport = formData.Get("employmentEquityReport");
            var EEA2document = formData.Get("EEA2document");
            var EEA4document = formData.Get("EEA4document");
            var socialLabourPlan = formData.Get("socialLabourPlan");
            var employmentContracts = formData.Get("employmentContracts");
            var workplaceSkillsPlan = formData.Get("workplaceSkillsPlan");
            var employeeAttendanceRegister = formData.Get("employeeAttendanceRegister");
            var basicConditionsofEmploymentAct = formData.Get("basicConditionsofEmploymentAct");
            var employmentEquityAct = formData.Get("employmentEquityAct");

            this.organizationBusinessLogic.SaveMetaData(orgID, "companyOrganogram", companyOrganogram);
            if (companyOrganogram.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "companyOrganogram");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "employmentEquityPolicy", employmentEquityPolicy);
            if (employmentEquityPolicy.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "employmentEquityPolicy");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "employmentEquityReport", employmentEquityReport);
            if (employmentEquityReport.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "employmentEquityReport");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "EEA2document", EEA2document);
            if (EEA2document.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "EEA2document");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "EEA4document", EEA4document);
            if (EEA4document.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "EEA4document");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "socialLabourPlan", socialLabourPlan);
            if (socialLabourPlan.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "socialLabourPlan");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "employmentContracts", employmentContracts);
            if (employmentContracts.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "employmentContracts");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "workplaceSkillsPlan", workplaceSkillsPlan);
            if (workplaceSkillsPlan.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "workplaceSkillsPlan");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "employeeAttendanceRegister", employeeAttendanceRegister);
            if (employeeAttendanceRegister.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "employeeAttendanceRegister");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "basicConditionsofEmploymentAct", basicConditionsofEmploymentAct);
            if (basicConditionsofEmploymentAct.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "basicConditionsofEmploymentAct");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "employmentEquityAct", employmentEquityAct);
            if (employmentEquityAct.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "HRINFO", "employmentEquityAct");
            }

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "HrInfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "HRINFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
                new FetchMetaData()
                {
                    OwnerID = orgID.ToString(),
                    MetaDataNames = new List<string>() { "companyOrganogram", "employmentEquityPolicy", "employmentEquityReport", "EEA2document", "EEA4document"
                , "socialLabourPlan" , "employmentContracts" , "workplaceSkillsPlan" , "employeeAttendanceRegister" , "basicConditionsofEmploymentAct" , "employmentEquityAct" }
                }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("hrInfo", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/InsuranceRiskInfo")]
        public HttpResponseMessage InsuranceRiskInfo(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var BuildingsInsurance = formData.Get("BuildingsInsurance");
            var PublicLiabilityInsurancePolicy = formData.Get("PublicLiabilityInsurancePolicy");
            var CompanyThirdPartyInsurancePolicy = formData.Get("CompanyThirdPartyInsurancePolicy");
            var CompanyProfessionalIndemnityInsurancePolicy = formData.Get("CompanyProfessionalIndemnityInsurancePolicy");
            var CompanyGoodsinTransitInsurancePolicy = formData.Get("CompanyGoodsinTransitInsurancePolicy");
           
            this.organizationBusinessLogic.SaveMetaData(orgID, "BuildingsInsurance", BuildingsInsurance);
            if (BuildingsInsurance.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "RISKINSURANCEINFO", "BuildingsInsurance");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "PublicLiabilityInsurancePolicy", PublicLiabilityInsurancePolicy);
            if (PublicLiabilityInsurancePolicy.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "RISKINSURANCEINFO", "PublicLiabilityInsurancePolicy");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "CompanyThirdPartyInsurancePolicy", CompanyThirdPartyInsurancePolicy);
            if (CompanyThirdPartyInsurancePolicy.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "RISKINSURANCEINFO", "CompanyThirdPartyInsurancePolicy");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "CompanyProfessionalIndemnityInsurancePolicy", CompanyProfessionalIndemnityInsurancePolicy);
            if (CompanyProfessionalIndemnityInsurancePolicy.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "RISKINSURANCEINFO", "CompanyProfessionalIndemnityInsurancePolicy");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "CompanyGoodsinTransitInsurancePolicy", CompanyGoodsinTransitInsurancePolicy);
            if (CompanyGoodsinTransitInsurancePolicy.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "RISKINSURANCEINFO", "CompanyGoodsinTransitInsurancePolicy");
            }

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "InsuranceInfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "INSURANCEINFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
                new FetchMetaData()
                {
                    OwnerID = orgID.ToString(),
                    MetaDataNames = new List<string>() { "BuildingsInsurance", "PublicLiabilityInsurancePolicy", "CompanyThirdPartyInsurancePolicy", "CompanyProfessionalIndemnityInsurancePolicy", "CompanyGoodsinTransitInsurancePolicy" }
                }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("insuranceInfo", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/FinanceInfo")]
        public HttpResponseMessage MetaDataFinanceInfo(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));            

            var updateAppointedAccountant = formData.Get("updateAppointedAccountant");
            var updatePublicInterestScore = formData.Get("updatePublicInterestScore");
            var updateElectronicAccountSystem = formData.Get("updateElectronicAccountSystem");

            this.organizationBusinessLogic.SaveMetaData(orgID, "AppointedAccountant", updateAppointedAccountant);
            if (updateAppointedAccountant.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "FININFO", "AccountantAppointmentLetter");

            if (updatePublicInterestScore != null)
            {
                this.organizationBusinessLogic.SaveMetaData(orgID, "PublicInterestScore", updatePublicInterestScore);
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "FININFO", "PublicInterestScoreLetter");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "ElectronicAccountingSystem", updateElectronicAccountSystem);

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "FinanceInfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "FINANCEINFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
                new FetchMetaData() { OwnerID = orgID.ToString(), MetaDataNames = new List<string>() { "AppointedAccountant", "PublicInterestScore", "ElectronicAccountingSystem" } }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("financeInfo", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/ISO9001Info")]
        public HttpResponseMessage ISO9001Info(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var qualityManagementSystemCertified = formData.Get("qualityManagementSystemCertified");
            var qualityManagementSystem = formData.Get("qualityManagementSystem");
            var qualityPolicy = formData.Get("qualityPolicy");
            var internalAuditReports = formData.Get("internalAuditReports");
            var managementReviewMeetingMinutes = formData.Get("managementReviewMeetingMinutes");
            var warrantyManagementProcess = formData.Get("warrantyManagementProcess");
            var guaranteeOnProducts = formData.Get("guaranteeOnProducts");
            var durationOfGuarantee = formData.Get("durationOfGuarantee");

            this.organizationBusinessLogic.SaveMetaData(orgID, "QualityManagementSystemCertified", qualityManagementSystemCertified);
            if (qualityManagementSystemCertified.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO9001INFO", "ISO19001Certificate");

            this.organizationBusinessLogic.SaveMetaData(orgID, "QualityManagementSystem", qualityManagementSystem);
            if (qualityManagementSystem.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO9001INFO", "ProofOfQualityManagementSystem");

            this.organizationBusinessLogic.SaveMetaData(orgID, "QualityPolicy", qualityPolicy);
            if (qualityPolicy.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO9001INFO", "ProofQualityPolicy");

            this.organizationBusinessLogic.SaveMetaData(orgID, "InternalAuditReports", internalAuditReports);
            if (internalAuditReports.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO9001INFO", "InternalAuditReports");

            this.organizationBusinessLogic.SaveMetaData(orgID, "ManagementReviewMeetingMinutes", managementReviewMeetingMinutes);
            if (managementReviewMeetingMinutes.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO9001INFO", "CopyOfManagementReviewMeetingMinutes");

            this.organizationBusinessLogic.SaveMetaData(orgID, "WarrantyManagementProcess", warrantyManagementProcess);
            if (warrantyManagementProcess.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO9001INFO", "WarrantyManagementProcess");

            this.organizationBusinessLogic.SaveMetaData(orgID, "GuaranteeOnProducts", guaranteeOnProducts);
            this.organizationBusinessLogic.SaveMetaData(orgID, "DurationOfGuarantee", durationOfGuarantee);

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "Iso9001InfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "ISO9001INFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
                new FetchMetaData()
                {
                    OwnerID = orgID.ToString(),
                    MetaDataNames = new List<string>() { "QualityManagementSystemCertified", "QualityManagementSystem", "InternalAuditReports", "ManagementReviewMeetingMinutes", "WarrantyManagementProcess"
                , "GuaranteeOnProducts" , "DurationOfGuarantee" }
                }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("iso9001", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/ISO14001Info")]
        public HttpResponseMessage ISO14001Info(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var environmentalManagementSystemCertified = formData.Get("environmentalManagementSystemCertified");
            var environmentalManagementPolicy = formData.Get("environmentalManagementPolicy");
            var registeredWithSaatcaOrSacnasp = formData.Get("registeredWithSaatcaOrSacnasp");
            var reduceCarbonFootPrint = formData.Get("reduceCarbonFootPrint");
            var enviromentalIncidentProcedure = formData.Get("enviromentalIncidentProcedure");
            var driversLicensedToTransportCargo = formData.Get("driversLicensedToTransportCargo");
            var supplyHazardousGoods = formData.Get("supplyHazardousGoods");
            var haveMaterialSafetyDataSheet = formData.Get("haveMaterialSafetyDataSheet");

            var transportWasteToLicensedWasteFacilities = formData.Get("transportWasteToLicensedWasteFacilities");
            var trucksMarkedWithCorrectSignage = formData.Get("trucksMarkedWithCorrectSignage");
            var provideWasteDisposalProcedure = formData.Get("provideWasteDisposalProcedure");
            var permitsToTransportWaste = formData.Get("permitsToTransportWaste");
            var trucksRegularlyServiced = formData.Get("trucksRegularlyServiced");
            var provideSpillCLeanUpProcedure = formData.Get("provideSpillCLeanUpProcedure");
            var provideHousekeepingProcedure = formData.Get("provideHousekeepingProcedure");
            var usePrincipleOfReUse = formData.Get("usePrincipleOfReUse");

            this.organizationBusinessLogic.SaveMetaData(orgID, "EnvironmentalManagementSystemCertified", environmentalManagementSystemCertified);
            if (environmentalManagementSystemCertified.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "ISO14001Certificate");

            this.organizationBusinessLogic.SaveMetaData(orgID, "EnvironmentalManagementPolicy", environmentalManagementPolicy);
            if (environmentalManagementPolicy.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "EnvironmentalManagementPolicy");

            this.organizationBusinessLogic.SaveMetaData(orgID, "RegisteredWithSaatcaOrSacnasp", registeredWithSaatcaOrSacnasp);
            if (registeredWithSaatcaOrSacnasp.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "SaatcaSacnsaspRegistrationDocument");

            this.organizationBusinessLogic.SaveMetaData(orgID, "ReduceCarbonFootPrint", reduceCarbonFootPrint);
            if (reduceCarbonFootPrint.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "EnviroInitiativesToReduceCarbonFootprint");

            this.organizationBusinessLogic.SaveMetaData(orgID, "EnviromentalIncidentProcedure", enviromentalIncidentProcedure);
            if (enviromentalIncidentProcedure.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "EnviromentalIncidentProcedureDocument");

            this.organizationBusinessLogic.SaveMetaData(orgID, "DriversLicensedToTransportCargo", driversLicensedToTransportCargo);
            if (driversLicensedToTransportCargo.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "CopyOfDriversLicence");

            this.organizationBusinessLogic.SaveMetaData(orgID, "SupplyHazardousGoods", supplyHazardousGoods);
            this.organizationBusinessLogic.SaveMetaData(orgID, "HaveMaterialSafetyDataSheet", haveMaterialSafetyDataSheet);

            this.organizationBusinessLogic.SaveMetaData(orgID, "TransportWasteToLicensedWasteFacilities", transportWasteToLicensedWasteFacilities);
            if (transportWasteToLicensedWasteFacilities.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "TransferNote");

            this.organizationBusinessLogic.SaveMetaData(orgID, "TrucksMarkedWithCorrectSignage", trucksMarkedWithCorrectSignage);
            if (trucksMarkedWithCorrectSignage.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "PicturesOfTrucksWithSignage");

            this.organizationBusinessLogic.SaveMetaData(orgID, "ProvideWasteDisposalProcedure", provideWasteDisposalProcedure);
            if (provideWasteDisposalProcedure.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "WasteDisposalProcedureDocument");

            this.organizationBusinessLogic.SaveMetaData(orgID, "PermitsToTransportWaste", permitsToTransportWaste);
            if (permitsToTransportWaste.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "PermitOfWasteBeingTransported");

            this.organizationBusinessLogic.SaveMetaData(orgID, "TrucksRegularlyServiced", trucksRegularlyServiced);
            if (trucksRegularlyServiced.ToUpper().Equals("YES"))
            {
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "TrucksLastServiceRecord");
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "TrucksLicenceDisk");
            }

            this.organizationBusinessLogic.SaveMetaData(orgID, "ProvideSpillCLeanUpProcedure", provideSpillCLeanUpProcedure);
            if (provideSpillCLeanUpProcedure.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "SpillCleanUpProcedureDocument");

            this.organizationBusinessLogic.SaveMetaData(orgID, "ProvideHousekeepingProcedure", provideHousekeepingProcedure);
            if (provideHousekeepingProcedure.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "HouseKeepingProcedureDocument");

            this.organizationBusinessLogic.SaveMetaData(orgID, "UsePrincipleOfReUse", usePrincipleOfReUse);
            if (usePrincipleOfReUse.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO14001", "LatestReUseInitiative");

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "Iso4001InfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "ISO14001INFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
               new FetchMetaData()
               {
                   OwnerID = orgID.ToString(),
                   MetaDataNames = new List<string>() { "EnvironmentalManagementSystemCertified", "EnvironmentalManagementPolicy", "RegisteredWithSaatcaOrSacnasp", "ReduceCarbonFootPrint", "EnviromentalIncidentProcedure"
                , "DriversLicensedToTransportCargo" , "SupplyHazardousGoods" , "TransportWasteToLicensedWasteFacilities" , "TrucksMarkedWithCorrectSignage",
                       "ProvideWasteDisposalProcedure" , "PermitsToTransportWaste","TrucksRegularlyServiced" , "ProvideSpillCLeanUpProcedure","ProvideHousekeepingProcedure" , "UsePrincipleOfReUse"}
               }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("iso40001", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/ISO18001Info")]
        public HttpResponseMessage ISO18001Info(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var occupationalHealthAndSafetyCertified = formData.Get("occupationalHealthAndSafetyCertified");
            var provideCopyOfCompayRiskAssessmentRecords = formData.Get("provideCopyOfCompayRiskAssessmentRecords");
            var haveAnEvacuationPlan = formData.Get("haveAnEvacuationPlan");
            var companyDisplayCopyofOHSA = formData.Get("companyDisplayCopyofOHSA");
            var haveRegularToolboxTalks = formData.Get("haveRegularToolboxTalks");
            var haveAppointOHSRep = formData.Get("haveAppointOHSRep");
            var haveFullyEquippedFirstAidBoxes = formData.Get("haveFullyEquippedFirstAidBoxes");

            this.organizationBusinessLogic.SaveMetaData(orgID, "OccupationalHealthAndSafetyCertified", occupationalHealthAndSafetyCertified);
            if (occupationalHealthAndSafetyCertified.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "ISO18001Certificate");

            this.organizationBusinessLogic.SaveMetaData(orgID, "ProvideCopyOfCompayRiskAssessmentRecords", provideCopyOfCompayRiskAssessmentRecords);
            if (provideCopyOfCompayRiskAssessmentRecords.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "RiskAssessmentRecords");

            this.organizationBusinessLogic.SaveMetaData(orgID, "HaveAnEvacuationPlan", haveAnEvacuationPlan);
            if (haveAnEvacuationPlan.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "EvacuationPlan");

            this.organizationBusinessLogic.SaveMetaData(orgID, "CompanyDisplayCopyofOHSA", companyDisplayCopyofOHSA);
            if (companyDisplayCopyofOHSA.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "PhotographOfDisplayedOHSAct");

            this.organizationBusinessLogic.SaveMetaData(orgID, "HaveRegularToolboxTalks", haveRegularToolboxTalks);
            if (haveRegularToolboxTalks.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "ToolboxSafetyAttendanceRegister");

            this.organizationBusinessLogic.SaveMetaData(orgID, "HaveAppointOHSRep", haveAppointOHSRep);
            if (haveAppointOHSRep.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "ListOfAppointedOHSReps");

            this.organizationBusinessLogic.SaveMetaData(orgID, "HaveFullyEquippedFirstAidBoxes", haveFullyEquippedFirstAidBoxes);
            if (haveFullyEquippedFirstAidBoxes.ToUpper().Equals("YES"))
                this.requirementBusinessLogic.RaiseRequirement("ORG", orgID.ToString(), "ISO18001INFO", "PhotographOfFirstAidBoxes");

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "Iso18001InfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "ISO18001INFO", MetaDataNames = new List<string>() { "WeightingCriteria" }, },
              new FetchMetaData()
              {
                  OwnerID = orgID.ToString(),
                  MetaDataNames = new List<string>() { "OccupationalHealthAndSafetyCertified", "ProvideCopyOfCompayRiskAssessmentRecords", "HaveAnEvacuationPlan", "CompanyDisplayCopyofOHSA", "HaveRegularToolboxTalks"
                , "HaveAppointOHSRep" , "HaveFullyEquippedFirstAidBoxes"}
              }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("iso18001", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/BEEInfo")]
        public HttpResponseMessage BEEInfo(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var BusinessSector = formData.Get("BusinessSector");
            var BusinessDescription = formData.Get("BusinessDescription");
            var BEEStatusLevel = formData.Get("BEEStatusLevel");
            var BEEProcRecognitionLevelPercentage = formData.Get("BEEProcRecognitionLevelPercentage");
            var FinancialYearRated = formData.Get("FinancialYearRated");
            var BlackOwnershipPercentage = formData.Get("BlackOwnershipPercentage");
            var BlackFemalOwnershipPercentage = formData.Get("BlackFemalOwnershipPercentage");
            var BlackYouthOwnershipPercentage = formData.Get("BlackYouthOwnershipPercentage");
            var VerificationAgencyName = formData.Get("VerificationAgencyName");
            var FinancialYearEnd = formData.Get("FinancialYearEnd");
            var FinancialYearTurnOver = formData.Get("FinancialYearTurnOver");
            var AccountantName = formData.Get("AccountantName");
            var DesignatedGroupSupplier = formData.Get("DesignatedGroupSupplier");
            var EmpoweringSupplier = formData.Get("EmpoweringSupplier");
            var EnterpriseType = formData.Get("EnterpriseType");
            var ShareHolderCount = formData.Get("ShareHolderCount");
            var ShareHolderBlackFemales = formData.Get("ShareHolderBlackFemales");
            var ShareHolderBlack = formData.Get("ShareHolderBlack");
            var ShareHolder18to35 = formData.Get("ShareHolder18to35");
            var ShareHolderBlackAndDisabled = formData.Get("ShareHolderBlackAndDisabled");
            var ShareHolderUnemployed = formData.Get("ShareHolderUnemployed");
            var ShareHolderRuralArea = formData.Get("ShareHolderRuralArea");
            var ShareHolderBlackMilitaryVeterans = formData.Get("ShareHolderBlackMilitaryVeterans");
            var DateAffidavitSigned = formData.Get("DateAffidavitSigned");            

            this.organizationBusinessLogic.SaveMetaData(orgID, "BusinessSector", BusinessSector);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BusinessDescription", BusinessDescription);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BEEStatusLevel", BEEStatusLevel);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BEEProcRecognitionLevelPercentage", BEEProcRecognitionLevelPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "FinancialYearRated", FinancialYearRated);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BlackOwnershipPercentage", BlackOwnershipPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BlackFemalOwnershipPercentage", BlackFemalOwnershipPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BlackYouthOwnershipPercentage", BlackYouthOwnershipPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "VerificationAgencyName", VerificationAgencyName);
            this.organizationBusinessLogic.SaveMetaData(orgID, "FinancialYearEnd", FinancialYearEnd);
            this.organizationBusinessLogic.SaveMetaData(orgID, "FinancialYearTurnOver", FinancialYearTurnOver);
            this.organizationBusinessLogic.SaveMetaData(orgID, "AccountantName", AccountantName);
            this.organizationBusinessLogic.SaveMetaData(orgID, "DesignatedGroupSupplier", DesignatedGroupSupplier);
            this.organizationBusinessLogic.SaveMetaData(orgID, "EmpoweringSupplier", EmpoweringSupplier);
            this.organizationBusinessLogic.SaveMetaData(orgID, "EnterpriseType", EnterpriseType);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderCount", ShareHolderCount);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlackFemales", ShareHolderBlackFemales);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlack", ShareHolderBlack);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolder18to35", ShareHolder18to35);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlackAndDisabled", ShareHolderBlackAndDisabled);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderUnemployed", ShareHolderUnemployed);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderRuralArea", ShareHolderRuralArea);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlackMilitaryVeterans", ShareHolderBlackMilitaryVeterans);
            this.organizationBusinessLogic.SaveMetaData(orgID, "DateAffidavitSigned", DateAffidavitSigned);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData")]
        public HttpResponseMessage GetMetaData(FetchMetaData fetchMetaData)
        {
            int decryptedOrgID = Convert.ToInt32(EncryptionHelper.Decrypt(fetchMetaData.OwnerID));
            fetchMetaData.OwnerID = decryptedOrgID.ToString();

            var financeMetaData = metaDataBusinessLogic.GetMetaDataByMetaDataName(fetchMetaData);
            
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(financeMetaData))
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

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/Organization/MetaData/BEEComplaince")]
        public HttpResponseMessage BEEComplaince(FormDataCollection formData)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(formData.Get("organizationID")));

            var BusinessSector = formData.Get("BusinessSector");
            var BusinessDescription = formData.Get("BusinessDescription");
            var BEEStatusLevel = formData.Get("BEEStatusLevel");
            var BEEProcRecognitionLevelPercentage = formData.Get("BEEProcRecognitionLevelPercentage");
            var FinancialYearRated = formData.Get("FinancialYearRated");
            var BlackOwnershipPercentage = formData.Get("BlackOwnershipPercentage");
            var BlackFemalOwnershipPercentage = formData.Get("BlackFemalOwnershipPercentage");
            var BlackYouthOwnershipPercentage = formData.Get("BlackYouthOwnershipPercentage");
            var VerificationAgencyName = formData.Get("VerificationAgencyName");
            var FinancialYearEnd = formData.Get("FinancialYearEnd");
            var FinancialYearTurnOver = formData.Get("FinancialYearTurnOver");
            var AccountantName = formData.Get("AccountantName");
            var DesignatedGroupSupplier = formData.Get("DesignatedGroupSupplier");
            var EmpoweringSupplier = formData.Get("EmpoweringSupplier");
            var EnterpriseType = formData.Get("EnterpriseType");
            var ShareHolderCount = formData.Get("ShareHolderCount");
            var ShareHolderBlack = formData.Get("ShareHolderBlack");
            var ShareHolder18to35 = formData.Get("ShareHolder18to35");
            var ShareHolderBlackAndDisabled = formData.Get("ShareHolderBlackAndDisabled");
            var ShareHolderUnemployed = formData.Get("ShareHolderUnemployed");
            var ShareHolderRuralArea = formData.Get("ShareHolderRuralArea");
            var ShareHolderBlackMilitaryVeterans = formData.Get("ShareHolderBlackMilitaryVeterans");
            var DateAffidavitSigned = formData.Get("DateAffidavitSigned");
           

            this.organizationBusinessLogic.SaveMetaData(orgID, "BusinessSector", BusinessSector);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BusinessDescription", BusinessDescription);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BEEStatusLevel", BEEStatusLevel);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BEEProcRecognitionLevelPercentage", BEEProcRecognitionLevelPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "FinancialYearRated", FinancialYearRated);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BlackOwnershipPercentage", BlackOwnershipPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BlackFemalOwnershipPercentage", BlackFemalOwnershipPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "BlackYouthOwnershipPercentage", BlackYouthOwnershipPercentage);
            this.organizationBusinessLogic.SaveMetaData(orgID, "VerificationAgencyName", VerificationAgencyName);
            this.organizationBusinessLogic.SaveMetaData(orgID, "FinancialYearEnd", FinancialYearEnd);
            this.organizationBusinessLogic.SaveMetaData(orgID, "FinancialYearTurnOver", FinancialYearTurnOver);
            this.organizationBusinessLogic.SaveMetaData(orgID, "AccountantName", AccountantName);
            this.organizationBusinessLogic.SaveMetaData(orgID, "DesignatedGroupSupplier", DesignatedGroupSupplier);
            this.organizationBusinessLogic.SaveMetaData(orgID, "EmpoweringSupplier", EmpoweringSupplier);
            this.organizationBusinessLogic.SaveMetaData(orgID, "EnterpriseType", EnterpriseType);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderCount", ShareHolderCount);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlack", ShareHolderBlack);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolder18to35", ShareHolder18to35);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlackAndDisabled", ShareHolderBlackAndDisabled);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderUnemployed", ShareHolderUnemployed);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderRuralArea", ShareHolderRuralArea);
            this.organizationBusinessLogic.SaveMetaData(orgID, "ShareHolderBlackMilitaryVeterans", ShareHolderBlackMilitaryVeterans);
            this.organizationBusinessLogic.SaveMetaData(orgID, "DateAffidavitSigned", DateAffidavitSigned);

            decimal weightingPercentage = decimal.Parse(configBusinessLogic.FindBy(x => x.name.ToLower() == "BeeInfoWeightPer".ToLower()).Select(x => x.value).FirstOrDefault());

            var weightingJSON = this.metaDataBusinessLogic.MetaDataScoringSystem(new FetchMetaData() { OwnerID = "BEEINFO", MetaDataNames = new List<string>() { "WeightingCriteria" } },
               new FetchMetaData()
               {
                   OwnerID = orgID.ToString(),
                   MetaDataNames = new List<string>() { "BusinessSector", "BusinessDescription", "BEEStatusLevel", "BEEProcRecognitionLevelPercentage", "FinancialYearRated"
                , "BlackOwnershipPercentage" , "BlackFemalOwnershipPercentage" , "BlackYouthOwnershipPercentage" , "DesignatedGroupSupplier",
                       "EmpoweringSupplier" , "ShareHolderCount","ShareHolderBlack" , "ShareHolder18to35","ShareHolderBlackAndDisabled" , "ShareHolderUnemployed", "ShareHolderRuralArea", "ShareHolderBlackMilitaryVeterans"}
               }, weightingPercentage);

            this.organizationWeightingBusinessLogic.SaveWeighting("beeInfo", weightingJSON, orgID);

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject("OK"))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

    }
}