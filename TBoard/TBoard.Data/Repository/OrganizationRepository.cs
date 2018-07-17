using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class OrganizationRepository : Repository<organization>
    {
        public OrganizationRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }

        public void MapUserToOrganization(int organizationID, int userID)
        {
            this._dbContext.organizationmappings.Add(new organizationmapping()
            {
                created = DateTime.Now,
                organizationID = organizationID,
                userID = userID
            });
            this._dbContext.SaveChanges();
        }

        public List<organization> GetUserOrganiztions(int userID)
        {
            var result = (from orgMap in this._dbContext.organizationmappings
                          join org in this._dbContext.organizations on orgMap.organizationID equals org.organizationID
                          select org).ToList();

            return result;
        }

        public organization GetOrganization(int organizationID)
        {
            return this._dbContext.organizations.Where(x => x.organizationID == organizationID).FirstOrDefault();
        }

        public IList<custodian> GetCustodianDetails(int organizationID)
        {
            return this._dbContext.custodians.Where(x => x.organizationID == organizationID).ToList();
        }

        public void SaveCustodianDetails(custodian custodian)
        {
            this._dbContext.custodians.Add(custodian);
            this.Save();
        }

        public void UpdateCustodianDetails(custodian custodian)
        {
            this._dbContext.Entry(custodian).State = EntityState.Modified;
            this.Save();
        }
    }
}
