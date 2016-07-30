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
        public TasksController(EmailQueueBusinessLogic emailQueueBusinessLogic)
        {
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
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

        public static void SendMail(emailqueue message)
        {
            /*host = "smtp.sendgrid.net" password = "Robyn123" userName = "azure_a2bbb2221ba1032d0a0f85f618e821ec@azure.com" port = "587"*/
            SmtpClient client = new SmtpClient();
            MailMessage mail = new MailMessage();
            mail.Body = message.body;
            mail.From = new MailAddress(message.from);
            mail.To.Add(new MailAddress(message.to));
            mail.Subject = message.subject;
            client.Send(mail);
        }




    }
}