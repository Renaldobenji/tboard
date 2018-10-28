using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class OrganizationWeightingRepository:Repository<organizationweighting>
    {
        public OrganizationWeightingRepository(TBoardEntitiesSQL dbContext)
          : base(dbContext)
        {

        }
    }
}
