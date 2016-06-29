using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class QuoteRepository : Repository<Model.quote>
    {
        public QuoteRepository(TBoardEntities dbContext)
            : base(dbContext)
        {
                
        }

        public IList<sps_getRFQOwnerDetails_Result> GetQuoteOwnerDetails(string rfqReference)
        {
            return this._dbContext.sps_getRFQOwnerDetails(rfqReference).ToList();
        }
    }
}
