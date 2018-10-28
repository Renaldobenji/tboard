using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class ExpertiseOwnershipRepository : Repository<expertiseownership>
    {
        public ExpertiseOwnershipRepository(TBoardEntitiesSQL dbContext)
            :base(dbContext)
        {
            
        }

        public IList<GetSubscribedOwnershipDetails_Result> GetSubscribed(int expertiseSubCategoryID)
        {
            return this._dbContext.GetSubscribedOwnershipDetails(expertiseSubCategoryID).ToList();
        }
    }
}
