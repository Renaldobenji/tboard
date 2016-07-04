using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class RFQRepository : Repository<rfq>
    {
        public RFQRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }

        public IList<rfqtype> GetAllRFQTypes()
        {
            return this._dbContext.rfqtypes.ToList();
        }

        public rfqtype GetRFQ(int rfqTypeID)
        {
            return this._dbContext.rfqtypes.FirstOrDefault(x => x.rfqTypeID == rfqTypeID);
        }

        public rfqtype GetRFQ(string prefix)
        {
            return this._dbContext.rfqtypes.FirstOrDefault(x => x.Prefix == prefix);
        }

        public IList<sps_GetBidsForQuote_Result> GetRFQBids(string rfqReference)
        {
            return this._dbContext.sps_GetBidsForQuote(rfqReference).ToList();
        }
    }
}
