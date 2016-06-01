using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class AddressRepository : Repository<address>
    {
        public AddressRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }
    }
}
