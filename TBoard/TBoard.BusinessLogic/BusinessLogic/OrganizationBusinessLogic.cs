using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class OrganizationBusinessLogic : BusinessLogic<organization>
    {
        private OrganizationRepository repository;

        public OrganizationBusinessLogic(IUnitOfWork unitOfWork, OrganizationRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public IList<custodian> GetCustodianDetails(int organizationID)
        {
           return this.repository.GetCustodianDetails(organizationID);
        }

        public void SaveCustodianDetails(custodian custodian)
        {
            this.repository.SaveCustodianDetails(custodian);
        }

        public void UpdateCustodianDetails(custodian custodian)
        {
            this.repository.UpdateCustodianDetails(custodian);
        }
    }
}
