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
    public class ExpertiseOwnershipBusinessLogic: BusinessLogic<expertiseownership>
    {
        private ExpertiseOwnershipRepository repository;

        public ExpertiseOwnershipBusinessLogic(IUnitOfWork unitOfWork, ExpertiseOwnershipRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public IList<GetSubscribedOwnershipDetails_Result> GetSubscribed(int expertiseSubCategoryID)
        {
            return this.repository.GetSubscribed(expertiseSubCategoryID).ToList();
        }
    }
}
