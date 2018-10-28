using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Model;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class DocumentBusinessLogic : BusinessLogic<document>
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

        public IList<OrganizationDocumentsDTO> GetUnverifiedDocuments(int orgID)
        {
            return repository.GetUnverifiedDocuments(orgID);
        }

        public IList<OrganizationDocumentsDTO> GetUnverifiedDocuments()
        {
            return repository.GetUnverifiedDocuments();
        }

        public bool VerifyDocument(int documentID)
        {
            return repository.VerifyDocument(documentID);
        }

        public string GetDocument(int documentID)
        {
            return repository.GetDocument(documentID);
        }

    }
}
