using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class DocumentBusinessLogic : BusinessLogic<TBoard.Data.Model.document>
    {
        private DocumentRepository repository;

        public DocumentBusinessLogic(IUnitOfWork unitOfWork, DocumentRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }
    }
}
