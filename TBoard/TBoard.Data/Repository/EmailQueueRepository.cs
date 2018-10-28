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
    public class EmailQueueRepository : Repository<emailqueue>
    {
        public EmailQueueRepository(TBoardEntitiesSQL dbContext)
            :base(dbContext)
        {
            
        }

        public IList<emailqueue> GetUnprocessedEmail()
        {
            return this._dbContext.emailqueues.Where(x => x.sentDate == null).ToList();
        }
    }
}
