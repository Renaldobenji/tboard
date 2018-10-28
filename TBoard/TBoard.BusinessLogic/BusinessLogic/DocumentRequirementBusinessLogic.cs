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
    public class DocumentRequirementBusinessLogic : BusinessLogic<documentrequirement>
    {
        private DocumentRequirementsRepository repository;

        public DocumentRequirementBusinessLogic(IUnitOfWork unitOfWork, DocumentRequirementsRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public IList<sps_GetOutstandingDocumentRequirements_Result> GetOutstandingDocumentRequirements(
            int organizationID)
        {
            return repository.GetOutstandingDocumentRequirements(organizationID);
        }
    }
}
