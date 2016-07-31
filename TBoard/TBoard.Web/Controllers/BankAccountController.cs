using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using TBoard.Web.Attributes;

namespace TBoard.Web.Controllers
{
    public class BankAccountController : ApiController
    {
        private BankAccountBusinessLogic bankacountBusinessLogic;
        private BankAccountTypeBusinessLogic bankAccountTypeBusinessLogic;
        public BankAccountController(BankAccountBusinessLogic bankacountBusinessLogic, BankAccountTypeBusinessLogic bankAccountTypeBusinessLogic)
        {
            this.bankacountBusinessLogic = bankacountBusinessLogic;
            this.bankAccountTypeBusinessLogic = bankAccountTypeBusinessLogic;
        }

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }


        // GET api/<controller>/5
        [JWTTokenValidation]
        [Route("api/BankAccount/BankAccountTypes/")]
        [System.Web.Http.HttpGet]
        public HttpResponseMessage BankAccountTypes()
        {
            IList<bankaccounttype> bankAcountTypes =
                this.bankAccountTypeBusinessLogic.GetAll().ToList();

            var response = new
            {
                data = from x in bankAcountTypes
                       select new 
                       {
                           Key = x.bankAccountTypeID,
                           BankAccountTypeCode = x.bankAccountTypeCode
                       }
            };
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response, Formatting.None,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        // GET api/<controller>/5
        [JWTTokenValidation]
        [Route("api/BankAccount/{ownerType}/{ownerID}")]
        public HttpResponseMessage Get(string ownerType, string ownerID)
        {
            bankaccountdetail bankDetails =
                this.bankacountBusinessLogic.FindBy(x => x.owningType == ownerType && x.owningID == ownerID)
                    .FirstOrDefault();

            var response = new
            {
                data = new
                {
                    AccountNumber = bankDetails.accountNumber,
                    AccountName = bankDetails.accountName,
                    BranchName = bankDetails.branchName,
                    BranchCode = bankDetails.branchCode, 
                    BankAccountTypeID = bankDetails.bankAccountTypeID
                }
            };
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response, Formatting.None,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        // POST api/<controller>
        [JWTTokenValidation]
        public void Post(FormDataCollection formData)
        {
            string ownerType = formData.Get("OwnerType");
            string owningID = formData.Get("OrganizationID");
            var bankDetails = bankacountBusinessLogic.FindBy(x => x.owningType == ownerType && x.owningID == owningID).FirstOrDefault();
            if (bankDetails == null)
            {
                bankaccountdetail details = new bankaccountdetail();
                details.owningType = ownerType;
                details.owningID = formData.Get("OrganizationID"); 
                details.accountName = formData.Get("AccountName"); 
                details.accountNumber = formData.Get("AccountNumber"); 
                details.branchCode = formData.Get("BranchCode"); 
                details.branchName = formData.Get("BranchName");
                details.bankAccountTypeID = Convert.ToInt32(formData.Get("SelectedBankAccountType"));
                this.bankacountBusinessLogic.Create(details);
            }
            else
            {
                bankDetails.accountName = formData.Get("AccountName"); 
                bankDetails.accountNumber = formData.Get("AccountNumber"); 
                bankDetails.branchCode = formData.Get("BranchCode"); 
                bankDetails.branchName = formData.Get("BranchName");
                bankDetails.bankAccountTypeID = Convert.ToInt32(formData.Get("SelectedBankAccountType"));
                this.bankacountBusinessLogic.Update(bankDetails);
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