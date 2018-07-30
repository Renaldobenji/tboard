using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using System.Web.Http;
using TBoard.Web.Attributes;
using System.IO;
using System.Web;

namespace TBoard.Web.Controllers
{
    public class RFQController : ApiController
    {
        private RFQBusinessLogic rfqBusinessLogic;
        private ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic;
        private EmailQueueBusinessLogic emailQueueBusinessLogic;
        private QuoteBusinessLogic quoteBusinessLogic;
        private ConfigBusinessLogic configBusinessLogic;

        public RFQController(RFQBusinessLogic addressBusinessLogic, ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic, EmailQueueBusinessLogic emailQueueBusinessLogic, QuoteBusinessLogic quoteBusinessLogic, ConfigBusinessLogic configBusinessLogic)
        {
            this.rfqBusinessLogic = addressBusinessLogic;
            this.expertiseOwnershipBusinessLogic = expertiseOwnershipBusinessLogic;
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
            this.quoteBusinessLogic = quoteBusinessLogic;
            this.configBusinessLogic = configBusinessLogic;
        }

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [Route("api/RFQ/Active/{userID}")]
        [JWTTokenValidation]
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

        [Route("api/RFQ/Statistics/{userID}")]
        [HttpGet]
        [JWTTokenValidation]
        public HttpResponseMessage Statistics(int userID)
        {
            //Get RFQ Active Count 
            var activeRFQTotal = this.rfqBusinessLogic.MyActiveRFQ(userID);
            //My Active Bids
            var activeBidsTotal = this.quoteBusinessLogic.GetActiveBids(userID);

            var r = new
            {
                data= new 
                {
                    activeRFQTotal = activeRFQTotal,
                    activeBidsTotal = activeBidsTotal
                }
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
            //My Organization Rating
        }

        [Route("api/RFQ/MyActiveBids/{userID}")]
        [HttpGet]
        [JWTTokenValidation]
        public HttpResponseMessage MyActiveBids(int userID)
        {            
            //My Active Bids
            var activeBids = this.quoteBusinessLogic.GetMyActiveBids(userID);

            var r = new
            {
                data = new
                {
                    activeBids = activeBids
                }
            };

            var converted = JsonConvert.SerializeObject(r, Formatting.None,
            new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(converted)
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
            //My Organization Rating
        }

        [HttpGet]
        [Route("api/RFQ/All/{userID}")]
        [JWTTokenValidation]
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
        [JWTTokenValidation]
        [Route("api/RFQ/Detail/{rfqReference}")]
        public HttpResponseMessage Detail(string rfqReference)
        {            
            var rfq = this.rfqBusinessLogic.FindBy(x => x.reference == rfqReference).First();

            var r = new
            {
                data = new
                {
                    reference = rfq.reference,
                    status =rfq.status,
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
        [JWTTokenValidation]
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
                this.emailQueueBusinessLogic.SendEmail("support@tenderboard.co.za", "support@tenderboard.co.za", "Request for Quotation", string.Format("There is no organization available to serve this request: {0}", rfq.reference));
                return;
            }

            var sitURL = configBusinessLogic.GetConfigValue("SiteURL");
            //Send out email to all subscribed to that category
            foreach (var e in expertiseOwnership)
            {                
                this.emailQueueBusinessLogic.SendEmail("support@tenderboard.co.za", e.communicationLine1,"Request for Quotation", createEmailBody(rfq.reference, sitURL + "admin#rfqbid/" + rfq.reference));
            } 
        }

        private string createEmailBody(string reference, string url)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/rfqrequest.html")))
            {

                body = reader.ReadToEnd();
            }

            body = body.Replace("{reference}", reference); //replacing the required things     
            body = body.Replace("{url}", url); //replacing the required things            

            return body;
        }

        [HttpPost]
        [JWTTokenValidation]
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

            var sitURL = configBusinessLogic.GetConfigValue("SiteURL");
            this.emailQueueBusinessLogic.SendEmail("support@tenderboard.co.za", rfqOwner.communicationLine1, "TenderBoard - Quotation Recieved", createEmailBody(sitURL+ "Admin#rfqdetail/" + rfqReference));            

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

        private string createBidEmailBody(string url)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/rfqbid.html")))
            {
                body = reader.ReadToEnd();
            }

            body = body.Replace("{url}", url);           

            return body;
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/QuoteBids/{rfqReference}")]
        public HttpResponseMessage QuoteBids(string rfqReference)
        {
            var result = JsonConvert.SerializeObject(rfqBusinessLogic.GetRFQBids(rfqReference));

            var r = new
            {
                data = result
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(result)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/BankDetails")]
        public HttpResponseMessage BankDetails()
        {
            var result = JsonConvert.SerializeObject(configBusinessLogic.GetConfigValue("BankingDetails"));

            var r = new
            {
                data = result
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(result)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpPost]
        [JWTTokenValidation]
        [Route("api/RFQ/QuoteBids/Order/")]
        public HttpResponseMessage QuoteBidsOrder(FormDataCollection formData)
        {
            var rfqReference = formData.Get("RFQReference");
            var orderList = formData.Get("OrderList");

            var quotes = rfqBusinessLogic.GetRFQBids(rfqReference);

            var orderlistValue = orderList.Split(',');
            var property1 = typeof(sps_GetBidsForQuote_Result).GetProperty(orderlistValue[0]);
            var property2 = typeof(sps_GetBidsForQuote_Result).GetProperty(orderlistValue[1]);
            var property3 = typeof(sps_GetBidsForQuote_Result).GetProperty(orderlistValue[2]);
            var property4 = typeof(sps_GetBidsForQuote_Result).GetProperty(orderlistValue[3]);
            var property5 = typeof(sps_GetBidsForQuote_Result).GetProperty(orderlistValue[4]);


            var sortedList = quotes.OrderBy(a => property1.GetValue(a, null))
                .ThenBy(b => property2.GetValue(b, null))
                .ThenBy(c => property3.GetValue(c, null))
                .ThenBy(d => property4.GetValue(d, null))
                .ThenBy(d => property5.GetValue(d, null)).ToList();

            var result = JsonConvert.SerializeObject(sortedList);

            var r = new
            {
                data = result
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(result)
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [JWTTokenValidation]
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
                Content = new StringContent(JsonConvert.SerializeObject(r, Formatting.None,
                                               new JsonSerializerSettings
                                               {
                                                   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                               }))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/HighestQuote/{rfqReference}/{userID}")]
        public HttpResponseMessage QuotehighestBid(string rfqReference, string userID)
        {
            var userIDInt = Convert.ToInt32(userID);
            var quote = this.rfqBusinessLogic.GetHighestRFQBids(rfqReference).OrderByDescending(x => x.amount).FirstOrDefault();

            var r = new
            {
                data = quote
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r, Formatting.None,
                                               new JsonSerializerSettings
                                               {
                                                   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                               }))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpPost]
        [JWTTokenValidation]
        [Route("api/RFQ/AcceptQuote")]
        public HttpResponseMessage AcceptQuote(FormDataCollection formData)
        {
            var RFQReference = formData.Get("RFQReference");
            var QuoteID = Convert.ToInt32(formData.Get("QuoteID"));
            var UserID = Convert.ToInt32(formData.Get("UserID"));
            var MetaData = formData.Get("MetaData");

            this.quoteBusinessLogic.AcceptBid(UserID, RFQReference, QuoteID, MetaData);            

            var alertInformation = this.quoteBusinessLogic.GetQuoteOwnerDetails(QuoteID);
            //Send Email
            foreach (var det in alertInformation)
            {
                this.emailQueueBusinessLogic.SendEmail("bid@tboard.com", det.communicationLine1, "Quote Accepted", createEmailBody(RFQReference));
            }            

            var r = new
            {
                data = "Successful"
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpPost]
        [JWTTokenValidation]
        [Route("api/RFQ/PayQuote")]
        public HttpResponseMessage PayQuote(FormDataCollection formData)
        {
            var RFQReference = formData.Get("reference");            
            var UserID = Convert.ToInt32(formData.Get("UserID"));

            var quoteid = this.quoteBusinessLogic.GetQuoteID(RFQReference);
            this.quoteBusinessLogic.PayBid(UserID, RFQReference, (int)quoteid);

            var alertInformation = this.quoteBusinessLogic.GetQuoteOwnerDetails((int)quoteid).Distinct();
            //Send Email
            foreach (var det in alertInformation)
            {
                this.emailQueueBusinessLogic.SendEmail("accounts@tenderboard.co.za", det.communicationLine1, "Quote Paid", createEmailBodyPaid(RFQReference));
                this.emailQueueBusinessLogic.SendEmail("accounts@tenderboard.co.za", "accounts@tenderboard.co.za", "Quote Paid", createEmailBodyPaid(RFQReference));
            }

            var r = new
            {
                data = "Successful"
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        private string createEmailBody(string RFQReferencee)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/bidaccepted.html")))
            {

                body = reader.ReadToEnd();
            }
            var sitURL = configBusinessLogic.GetConfigValue("SiteURL");
            body = body.Replace("{reference}", RFQReferencee); //replacing the required things              
            body = body.Replace("{url}", string.Format(sitURL+ "admin#rfqpay/{0}", RFQReferencee)); //replacing the required things                   

            return body;
        }

        private string createEmailBodyPaid(string RFQReferencee)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/quotepaid.html")))
            {

                body = reader.ReadToEnd();
            }
            var sitURL = configBusinessLogic.GetConfigValue("SiteURL");
            body = body.Replace("{reference}", RFQReferencee); //replacing the required things              
            body = body.Replace("{url}", string.Format(sitURL + "admin#rfqdetail/{0}", RFQReferencee)); //replacing the required things                   

            return body;
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/GetAcceptedQuotes/{userID}")]
        public HttpResponseMessage GetAcceptedQuotes(int userID)
        {

            var data = this.quoteBusinessLogic.GetAcceptedBids(userID);

            var r = new
            {
                data = data
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/GetBidsWon/{userID}")]
        public HttpResponseMessage GetBidsWon(int userID)
        {

            try
            {
                var data = this.quoteBusinessLogic.GetBidsWon(userID);

                var r = new
                {
                    data = data
                };

                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(r))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
            catch (Exception ex)
            {
                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(ex.ToString()))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/GetBidsLost/{userID}")]
        public HttpResponseMessage GetBidsLost(int userID)
        {
            try
            {
                var data = this.quoteBusinessLogic.GetBidsLost(userID);

                var r = new
                {
                    data = data
                };

                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(r))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
            catch (Exception ex)
            {
                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(ex.ToString()))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
        }

        [HttpPost]
        [JWTTokenValidation]
        [Route("api/RFQ/GetQuoteHistory")]
        public HttpResponseMessage GetQuoteHistory(FormDataCollection formData)
        {
            try
            {
                var userID = Convert.ToInt32(formData.Get("userID"));
                var status = formData.Get("status");
                var startDate = Convert.ToDateTime(formData.Get("startDate").Substring(0,10)).ToString("yyyy/MM/dd");
                var endDate = Convert.ToDateTime(formData.Get("endDate").Substring(0, 10)).ToString("yyyy/MM/dd");

                var dataResult = this.quoteBusinessLogic.sps_GetQuoteHistory(userID, status, startDate, endDate);


                var data = dataResult.Select(y => new
                {
                    reference = y.rfqReference,
                    createdDate = y.createdDate,
                    quoteStatusDateTime = y.quoteStatusDateTime,
                    amount = y.amount
                });

                var r = new
                {
                    data = data
                };

                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(r))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
            catch (Exception ex)
            {
                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(ex.ToString()))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/GetAcceptedBidsCount/{userID}")]
        public HttpResponseMessage GetAcceptedBidsCount(int userID)
        {

            var data = this.quoteBusinessLogic.GetAcceptedBidsCount(userID);

            var r = new
            {
                data = data
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return resp;
        }

        [HttpGet]
        [JWTTokenValidation]
        [Route("api/RFQ/GetBidsWonCount/{userID}")]
        public HttpResponseMessage GetBidsWonCount(int userID)
        {
            try
            {
                var data = this.quoteBusinessLogic.GetBidsWonCount(userID);

                var r = new
                {
                    data = data
                };

                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(r))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
            catch (Exception ex)
            {
                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(ex.ToString()))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                return resp;
            }
        }

        [HttpPost]
        [JWTTokenValidation]
        [Route("api/RFQ/Cancel")]
        public void Cancel(FormDataCollection formData)
        {
            var rfqReference = formData.Get("RFQReference");
            var rfq = this.rfqBusinessLogic.FindBy(x => x.reference == rfqReference).SingleOrDefault();
            rfq.status = "CAN";
            this.rfqBusinessLogic.Update(rfq);
        }

        [HttpPost]
        [JWTTokenValidation]
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