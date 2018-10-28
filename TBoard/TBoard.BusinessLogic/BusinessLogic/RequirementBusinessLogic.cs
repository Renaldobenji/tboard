using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class RequirementBusinessLogic : BusinessLogic<requirement>
    {
        private RequirementsRepository repository;

        public RequirementBusinessLogic(IUnitOfWork unitOfWork, RequirementsRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public IList<RequirementsDTO> RaiseRequirement(string entityOwnerType, string entityOwningID, string ownerType, string owningID)
        {
           return this.repository.RaiseDocumentRequirement(entityOwnerType, entityOwningID, ownerType, owningID);
        }
        
    }
}
