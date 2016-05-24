using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Repository
{
    public class CommunicationRepository : Repository<Model.communication>
    {
        public CommunicationRepository(DbContext dbContext)
            : base(dbContext)
        {
                
        }
    }
}
