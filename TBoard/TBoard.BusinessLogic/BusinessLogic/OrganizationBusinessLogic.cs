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

        public OrganizationDTO GetOrganization(int organizationID)
        {
           return this.repository.GetOrganization(organizationID);
           
        }

        public void MapUserToOrganization(int organizationID, int userID)
        {
            this.repository.MapUserToOrganization(organizationID, userID);
        }

        public List<organization> GetUserOrganiztions(int userID)
        {
            return this.repository.GetUserOrganiztions(userID);
        }

        public IList<custodian> GetCustodianDetails(int organizationID)
        {
           return this.repository.GetCustodianDetails(organizationID);
        }

        public void SaveCustodianDetails(custodian custodian)
        {
            this.repository.SaveCustodianDetails(custodian);
        }

        public void SaveMetaData(int OrganizationId, string key, string value)
        {
            this.repository.SaveMetaData(OrganizationId, key, value);
        }

        public void UpdateCustodianDetails(custodian custodian)
        {
            this.repository.UpdateCustodianDetails(custodian);
        }
    }
}
