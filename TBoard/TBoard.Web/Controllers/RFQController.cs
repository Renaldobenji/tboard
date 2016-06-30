﻿using System;
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
        private QuoteBusinessLogic quoteBusinessLogic;

        public RFQController(RFQBusinessLogic addressBusinessLogic, ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic, EmailQueueBusinessLogic emailQueueBusinessLogic, QuoteBusinessLogic quoteBusinessLogic)
        {
            this.rfqBusinessLogic = addressBusinessLogic;
            this.expertiseOwnershipBusinessLogic = expertiseOwnershipBusinessLogic;
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
            this.quoteBusinessLogic = quoteBusinessLogic;
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
                    expiryDate = y.expiryDate,
                    actions = y.reference
                })
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [Route("api/RFQ/All/{userID}")]
        public HttpResponseMessage All(string userID)
        {
            var userIDInt = Convert.ToInt32(userID);
            var rfq = this.rfqBusinessLogic.FindBy(x => x.userID == userIDInt).ToList();

            var r = new
            {
                data = rfq.Select(y => new
                {
                    reference = y.reference,
                    userName = y.user.username,
                    expertise = y.expertisesubcategory.Name,
                    rfqDetails = y.rfqDetails,
                    rfqType = y.rfqtype.code,
                    status = y.status,
                    createdDate = y.dateCreated,
                    expiryDate = y.expiryDate,
                    actions = y.reference
                })
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [Route("api/RFQ/Detail/{rfqReference}")]
        public HttpResponseMessage Detail(string rfqReference)
        {            
            var rfq = this.rfqBusinessLogic.FindBy(x => x.reference == rfqReference).First();

            var r = new
            {
                data = new
                {
                    reference = rfq.reference,
                    userName = rfq.user.username,
                    expertise = rfq.expertisesubcategory.Name,
                    rfqDetails = rfq.rfqDetails,
                    rfqType = rfq.rfqtype.code,
                    createdDate = rfq.dateCreated,
                    expiryDate = rfq.expiryDate,
                    actions = rfq.reference
                }
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
                    Convert.ToInt32(formData.Get("ExpertiseSubCategoryID")));       

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
        [Route("api/RFQ/Quote")]
        public HttpResponseMessage Quote(FormDataCollection formData)
        {
            var rfqReference = formData.Get("RFQReference");
            var userID = Convert.ToInt32(formData.Get("UserID"));
            var amount = Convert.ToDecimal(formData.Get("NewBidAmount"));
            var supplyTime = Convert.ToDateTime(formData.Get("SupplyTime"));
            var deliveryTime = Convert.ToDateTime(formData.Get("DeliveryTime"));
            //Create Quote

            var quote = this.quoteBusinessLogic.FindBy(x => x.rfqReference == rfqReference && x.userID == userID).LastOrDefault();
            if (quote != null)
            {
                if (quote.amount > amount)
                {
                    var rs = new
                    {
                        data = quote
                    };

                    var resps = new HttpResponseMessage()
                    {
                        Content = new StringContent(JsonConvert.SerializeObject(rs))
                    };
                    resps.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                    return resps;
                }
            }

            quote q = new quote();
            q.rfqReference = rfqReference;
            q.userID = userID;
            q.amount = amount;
            q.deliveryTime = deliveryTime;
            q.supplyTime = supplyTime;
            q.createdDate = DateTime.Now;
            this.quoteBusinessLogic.Create(q);

            //This will need to send out an email
            var rfqOwner = this.quoteBusinessLogic.GetQuoteOwnerDetails(rfqReference).SingleOrDefault();
            this.emailQueueBusinessLogic.SendEmail("admin@Tenderboard.co.za", rfqOwner.communicationLine1, "Hi, please see quote from supplier", "Hi, please see quote from supplier");            

            var r = new
            {
                data = q
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [Route("api/RFQ/MyLatestQuote/{rfqReference}/{userID}")]
        public HttpResponseMessage MyLatestQuote(string rfqReference, string userID)
        {
            var userIDInt = Convert.ToInt32(userID);
            var quote = this.quoteBusinessLogic.FindBy(x => x.rfqReference == rfqReference && x.userID == userIDInt).LastOrDefault();
            
             var r = new
            {
                data = quote
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpPost]
        [Route("api/RFQ/Cancel")]
        public void Cancel(FormDataCollection formData)
        {
            var rfqReference = formData.Get("RFQReference");
            var rfq = this.rfqBusinessLogic.FindBy(x => x.reference == rfqReference).SingleOrDefault();
            rfq.status = "CAN";
            this.rfqBusinessLogic.Update(rfq);
        }

        [HttpPost]
        [Route("api/RFQ/Update")]
        public void Update(FormDataCollection formData)
        {
            var rfqReference = formData.Get("RFQReference");
            var rfq = this.rfqBusinessLogic.FindBy(x => x.reference == rfqReference).SingleOrDefault();
            populateUpdateRFQ(formData, rfq);
            this.rfqBusinessLogic.Update(rfq);
        }

        private void populateUpdateRFQ(FormDataCollection formData, rfq rfq)
        {
            rfq.rfqDetails = formData.Get("RFQDetails");
            if (!String.IsNullOrEmpty(formData.Get("ExpiryDate")))
            {
                rfq.expiryDate = Convert.ToDateTime(formData.Get("ExpiryDate"));
            }
        }

        private void populateRFQ(FormDataCollection formData, rfq rfq)
        {
            var rfqType = rfqBusinessLogic.GetRFQ(formData.Get("QuoteType"));
            var todayDate = DateTime.Now.ToString("yyMMdd");
            var rfqPrefix = rfqType.Prefix;

            rfq.reference = string.Format("{0}{1}{2}", rfqPrefix, todayDate, GenerateRandomString(3).ToUpper());
            rfq.userID = Convert.ToInt32(formData.Get("UserID"));
            rfq.expertiseSubCategoryID = Convert.ToInt32(formData.Get("ExpertiseSubCategoryID"));
            rfq.rfqDetails = formData.Get("RFQDetails");
            rfq.rfqTypeID = rfqType.rfqTypeID;
            rfq.dateCreated = DateTime.Now;
            if (!String.IsNullOrEmpty(formData.Get("ExpiryDate")))
            {
                rfq.expiryDate = Convert.ToDateTime(formData.Get("ExpiryDate"));
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