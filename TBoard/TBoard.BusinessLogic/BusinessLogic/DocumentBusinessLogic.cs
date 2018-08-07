using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;
using TBoard.Data.Model;

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

        public IList<OrganizationDocumentsDTO> GetOrganizationDocuments(int orgID)
        {
            return repository.GetOrganizationDocuments(orgID);
        }
    }
}
