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
        [Route("api/Tasks/SendEmail")]
        public void SendEmail()
        {
            var unprocessedEmailQueue = this.emailQueueBusinessLogic.GetUnprocessedEmail();

            foreach(var email in unprocessedEmailQueue)
            {
                try
                {
                    SendMail(email);
                    email.sentDate = DateTime.Now;
                    this.emailQueueBusinessLogic.Update(email);                               
                }
                catch(Exception ex)
                {

                }
            }
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