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
using System.Net.Mail;
using System.IO;
using System.Web;

namespace TBoard.Web.Controllers
{
    public class TasksController : ApiController
    {
        private EmailQueueBusinessLogic emailQueueBusinessLogic;
        private ConfigBusinessLogic configBusinessLogic;
        public TasksController(EmailQueueBusinessLogic emailQueueBusinessLogic, ConfigBusinessLogic configBusinessLogic)
        {
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
            this.configBusinessLogic = configBusinessLogic;
        }


        // GET api/<controller>/5
        [HttpGet]        
        [Route("api/Tasks/ExpiredDocumentNotification")]
        public void ExpiredDocumentNotification()
        {
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now.AddDays(10);

            using (TBoardEntities entities = new TBoardEntities())
            {
                var closeToExpiry = (from documents in entities.documents
                                   where documents.expiryDate.Value >= startDate && documents.expiryDate.Value <= endDate
                                     select documents).ToList();

                foreach (var doc in closeToExpiry)
                {
                    var custodian = (from cust in entities.custodians.Where(x => x.organizationID == doc.organizationID)
                                     select cust).FirstOrDefault();
                    string email = "";

                    if (custodian == null || string.IsNullOrEmpty(custodian.email))
                    {
                        var user = (from usser in entities.users.Where(x => x.organizationID == doc.organizationID)
                                         select usser).FirstOrDefault();
                        if (user == null || string.IsNullOrEmpty(user.username))
                        {
                            continue;
                        }
                        else
                        {
                            email = user.username;
                        }
                    }
                    else
                    {
                        email = custodian.email;
                    }

                    if (String.IsNullOrEmpty(email))
                    {
                        continue;
                    }
                    double totalDays = Math.Round((DateTime.Now - doc.expiryDate.Value).TotalDays, MidpointRounding.AwayFromZero) * -1;
                    this.emailQueueBusinessLogic.SendEmail("support@tenderboard.co.za", email, "Document Expired Notification", createExpiredDocumentEmailBody(doc.documenttype.documentDescription, totalDays.ToString()));
                    unverifyCompany();
                }
            }
        }

        private void unverifyCompany()
        {
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now.AddDays(1);
            using (TBoardEntities entities = new TBoardEntities())
            {
                var organ =        (from org in entities.organizations
                                     join doc in entities.documents on org.organizationID equals doc.organizationID
                                     where doc.expiryDate.Value >= startDate && doc.expiryDate.Value <= endDate
                                     select org).ToList();

                foreach (var o in organ)
                {
                    o.verified = new Nullable<DateTime>();
                };

                entities.SaveChanges();
            }
        }

        private string createExpiredDocumentEmailBody(string documentType, string dateDiff)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/expiredDocuments.html")))
            {

                body = reader.ReadToEnd();
            }

            body = body.Replace("{document}", documentType); //replacing the required things     
            body = body.Replace("{days}", dateDiff); //replacing the required things            

            return body;
        }

        [HttpGet]
        [Route("api/Tasks/SendEmail")]
        public HttpResponseMessage SendEmail()
        {
            var unprocessedEmailQueue = this.emailQueueBusinessLogic.GetUnprocessedEmail();

            foreach (var email in unprocessedEmailQueue)
            {
                SendMail(email);
                email.sentDate = DateTime.Now;
                this.emailQueueBusinessLogic.Update(email);
            }

            return this.Request.CreateResponse(HttpStatusCode.OK);
        }

        public void SendMail(emailqueue message)
        {
            var SendGridUsername = this.configBusinessLogic.GetConfigValue("SendGridUsername");
            var SendGridSMTPServer = this.configBusinessLogic.GetConfigValue("SendGridSMTPServer");
            var SendGridPassword = this.configBusinessLogic.GetConfigValue("SendGridPassword");


            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = SendGridSMTPServer;
            client.EnableSsl = false;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(SendGridUsername, SendGridPassword);
            
            MailMessage mail = new MailMessage();
            mail.Body = message.body;
            mail.IsBodyHtml = true;
            mail.From = new MailAddress(message.from);
            mail.To.Add(new MailAddress(message.to));
            mail.Subject = message.subject;

            client.Send(mail);
        }




    }
}