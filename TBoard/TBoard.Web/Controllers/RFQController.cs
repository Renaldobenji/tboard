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

namespace TBoard.Web.Controllers
{
    public class RFQController : ApiController
    {
        private RFQBusinessLogic rfqBusinessLogic;
        private ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic;
        private EmailQueueBusinessLogic emailQueueBusinessLogic;
        public RFQController(RFQBusinessLogic addressBusinessLogic, ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic, EmailQueueBusinessLogic emailQueueBusinessLogic)
        {
            this.rfqBusinessLogic = addressBusinessLogic;
            this.expertiseOwnershipBusinessLogic = expertiseOwnershipBusinessLogic;
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
        }

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [Route("api/RFQ/Active/{userID}")]
        public HttpResponseMessage Get(string userID)
        {
            var userIDInt = Convert.ToInt32(userID);
            var rfq = this.rfqBusinessLogic.FindBy(x => x.userID == userIDInt && x.status == "ACT").ToList();

            var r = new
            {
                data = rfq.Select(y => new
                {
                    reference = y.reference,
                    userName = y.user.username,
                    expertise = y.expertisesubcategory.Name,
                    rfqDetails = y.rfqDetails,
                    rfqType = y.rfqtype.code,
                    createdDate = y.dateCreated,
                    expiryDate = y.expiryDate
                })
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        // POST api/<controller>
        public void Post(FormDataCollection formData)
        {
            rfq rfq = new rfq();
            populateRFQ(formData, rfq);
            this.rfqBusinessLogic.Create(rfq);
            
            //Send out email
            var expertiseOwnership =
                this.expertiseOwnershipBusinessLogic.GetSubscribed(
                    Convert.ToInt32(formData.Get("expertiseSubCategoryID")));

            if (expertiseOwnership.Count.Equals(0))
            {
                //Send email to admin
                this.emailQueueBusinessLogic.SendEmail("admin@Tenderboard.co.za", "admin@Tenderboard.co.za", "Request for Quotation", "There is no organization available to serve this request");
                return;
            }
            //Send out email to all subscribed to that category
            foreach (var e in expertiseOwnership)
            {
                this.emailQueueBusinessLogic.SendEmail("admin@Tenderboard.co.za",e.communicationLine1,"Request for Quotation","Body of the Quotation");
            }
            

        }

        [HttpPost]
        [Route("api/RFQ/Cancel")]
        public void Cancel(FormDataCollection formData)
        {
            var rfqReference = formData.Get("rfqReference");
            var rfq = this.rfqBusinessLogic.FindBy(x => x.reference == rfqReference).SingleOrDefault();
            rfq.status = "CAN";
            this.rfqBusinessLogic.Update(rfq);
        }

        [HttpPost]
        [Route("api/RFQ/Update")]
        public void Update(FormDataCollection formData)
        {
            rfq rfq = new rfq();
            populateUpdateRFQ(formData, rfq);
            this.rfqBusinessLogic.Update(rfq);
        }

        private void populateUpdateRFQ(FormDataCollection formData, rfq rfq)
        {
            rfq.rfqDetails = formData.Get("rfqDetails");
            if (String.IsNullOrEmpty(formData.Get("expiryDate")))
            {
                rfq.expiryDate = Convert.ToDateTime(formData.Get("expiryDate"));
            }
        }

        private void populateRFQ(FormDataCollection formData, rfq rfq)
        {
            var rfqTypeID = Convert.ToInt32(formData.Get("rfqTypeID"));
            var todayDate = DateTime.Now.ToString("YYMMDD");
            var rfqPrefix = rfqBusinessLogic.GetRFQ(rfqTypeID).Prefix;

            rfq.reference = string.Format("{0}{1}{2}", rfqPrefix, todayDate, GenerateRandomString(3));
            rfq.userID = Convert.ToInt32(formData.Get("userID"));
            rfq.expertiseSubCategoryID = Convert.ToInt32(formData.Get("expertiseSubCategoryID"));
            rfq.rfqDetails = formData.Get("rfqDetails");
            rfq.rfqTypeID = rfqTypeID;
            rfq.dateCreated = DateTime.Now;
            if (String.IsNullOrEmpty(formData.Get("expiryDate")))
            {
                rfq.expiryDate = Convert.ToDateTime(formData.Get("expiryDate"));
            }
            rfq.status = "ACT";
        }

        public string GenerateRandomString(int num)
        {
            string possibleChars = "abcdefghijklmnopqrstuvwxyz";
            char[] possibleCharsArray = possibleChars.ToCharArray();
            int possibleCharsAvailable = possibleChars.Length;
            Random random = new Random();
            var rBytes = new byte[num];
            random.NextBytes(rBytes);
            var rName = new char[num];
            while (num-- > 0)
                rName[num] = possibleCharsArray[rBytes[num] % possibleCharsAvailable];
            return new string(rName);
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