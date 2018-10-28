using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class EmailQueueBusinessLogic : BusinessLogic<emailqueue>
    {
        private EmailQueueRepository repository;

        public EmailQueueBusinessLogic(IUnitOfWork unitOfWork, EmailQueueRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public void SendEmail(string from, string to, string subject, string body)
        {
            this.repository.Insert(new emailqueue()
            {
                from = from,
                body = body,
                createdDate = DateTime.Now,
                subject = subject,
                to = to
            });

            this.repository.Save();
        }

        public IList<emailqueue> GetUnprocessedEmail()
        {
            return this.repository.GetUnprocessedEmail();
        }
    }
}
