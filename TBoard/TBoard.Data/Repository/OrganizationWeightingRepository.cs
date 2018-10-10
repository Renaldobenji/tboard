using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class OrganizationWeightingRepository:Repository<organizationweighting>
    {
        public OrganizationWeightingRepository(TBoardEntities dbContext)
          : base(dbContext)
        {

        }
    }
}
