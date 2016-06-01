using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class DocumentRequirementsRepository : Repository<documentrequirement>
    {
        public DocumentRequirementsRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
           
        }

        public IList<DocumentReq> GetOutstandingDocumentRequirements(int organizationID)
        {
            var result = this._dbContext.sps_GetOutstandingDocumentRequirements(organizationID).ToList();
            return result;
        }
    }
}
