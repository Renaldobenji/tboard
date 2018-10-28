using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class DocumentRequirementsRepository : Repository<documentrequirement>
    {
        public DocumentRequirementsRepository(TBoardEntitiesSQL dbContext)
            :base(dbContext)
        {
           
        }

        public IList<sps_GetOutstandingDocumentRequirements_Result> GetOutstandingDocumentRequirements(int organizationID)
        {
            var result = this._dbContext.sps_GetOutstandingDocumentRequirements(organizationID).ToList();
            return result;
        }

    }
}
