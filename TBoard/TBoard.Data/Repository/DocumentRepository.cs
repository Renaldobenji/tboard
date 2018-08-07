using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
   
    public class DocumentRepository : Repository<document>
    {
        public DocumentRepository(TBoardEntities dbContext)
            : base(dbContext)
        {

        }

        public IList<OrganizationDocumentsDTO> GetOrganizationDocuments(int orgID)
        {
            var entities = (from x in this._dbContext.documents
                            where x.organizationID == orgID
                            select new OrganizationDocumentsDTO()
                            {
                                documentID = x.documentID,
                                dateCreated = x.dateCreated,
                                documenttype = x.documenttype.documentDescription,
                                expiryDate = x.expiryDate,
                                verified = x.verified,
                            }).ToList();

            return entities;

        }
    }
}
