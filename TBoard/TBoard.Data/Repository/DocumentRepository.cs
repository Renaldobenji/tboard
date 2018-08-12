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
                                dateCreated = (DateTime)x.dateCreated,
                                documenttype = x.documenttype.documentDescription,
                                expiryDate = x.expiryDate,
                                verified = x.verified,
                            }).ToList();

            return entities;

        }

        public IList<OrganizationDocumentsDTO> GetUnverifiedDocuments()
        {
            var entities = (from x in this._dbContext.documents
                            where x.verified == null                        
                            select new OrganizationDocumentsDTO()
                            {
                                documentID = x.documentID,
                                dateCreated = (DateTime)x.dateCreated,
                                documenttype = x.documenttype.documentDescription,
                                expiryDate = x.expiryDate,
                                verified = x.verified,
                                organizationID = (int)x.organizationID,
                                organizationName = x.organization.name
                            }).ToList();

            return entities;

        }

        public IList<OrganizationDocumentsDTO> GetUnverifiedDocuments(int organizationID)
        {
            var entities = (from x in this._dbContext.documents
                            where x.verified == null && x.organizationID == organizationID
                            select new OrganizationDocumentsDTO()
                            {
                                documentID = x.documentID,
                                dateCreated = (DateTime)x.dateCreated,
                                documenttype = x.documenttype.documentDescription,
                                expiryDate = x.expiryDate,
                                verified = x.verified,
                            }).ToList();

            return entities;

        }

        public bool VerifyDocument(int documentID)
        {        
            //Get Document    
            var document = (from x in this._dbContext.documents
                            where x.documentID == documentID
                            select x).First();

            document.verified = DateTime.Now;

            //Get Outstanding documents from Organization
            var outdocument = (from x in this._dbContext.documents
                                where x.organizationID == document.organizationID && x.verified == null && x.documentID != documentID
                                select x).FirstOrDefault();

            if (outdocument == null)
            {
                var organization = (from x in this._dbContext.organizations
                                    where x.organizationID == document.organizationID
                                    select x).First();
                organization.verified = DateTime.Now;
            }

            this._dbContext.SaveChanges();
            return true;

        }

        public string GetDocument(int documentID)
        {
            //Get Document    
            var document = (from x in this._dbContext.documents
                            where x.documentID == documentID
                            select x).First();

            
            return document.documentPath;

        }
    }
}
