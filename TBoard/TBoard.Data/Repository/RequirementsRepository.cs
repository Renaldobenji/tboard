using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class RequirementsRepository : Repository<requirement>
    {
        public RequirementsRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }

        public IList<RequirementsDTO> RaiseRequirement(string entityOwnerType, string entityOwningID, string ownerType, string owningID)
        {
            var req = new List<RequirementsDTO>();
            req.AddRange(RaiseDocumentRequirement(entityOwnerType, entityOwningID, ownerType, owningID));

            return req;
        }

        public IList<RequirementsDTO> RaiseDocumentRequirement(string entityOwnerType, string entityOwningID, string ownerType, string owningID)
        {
            var docReq = new List<RequirementsDTO>();
            var isThereDocReq = (from x in this._dbContext.metadatas
                                 where x.metaDataName == "DOCREQ" && x.ownerType == ownerType && x.ownerTypeID == owningID
                                 select x.metaDataValue).FirstOrDefault();

            if (isThereDocReq == null)
                return null;

            string[] req = isThereDocReq.Split(',');
            foreach(var s in req)
            {
                docReq.Add(new RequirementsDTO()
                {
                    RequirementName = s,
                    RequirementType = "DOCUMENTREQUIREMENT"
                });

                this._dbContext.requirements.Add(new requirement()
                {
                    owningID = entityOwningID,
                    owningType = entityOwnerType,
                    date = DateTime.Now,
                    requirementTypeCode = "DOCUMENTREQUIREMENT",
                    metaData = s
                });
            }

            this._dbContext.SaveChanges();

            return docReq;

        }
    }
}
