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
