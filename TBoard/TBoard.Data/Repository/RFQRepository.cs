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
    public class RFQRepository : Repository<rfq>
    {
        public RFQRepository(TBoardEntitiesSQL dbContext)
            :base(dbContext)
        {
            
        }

        public IList<rfqtype> GetAllRFQTypes()
        {
            return this._dbContext.rfqtypes.ToList();
        }

        public rfqtype GetRFQ(int rfqTypeID)
        {
            return this._dbContext.rfqtypes.FirstOrDefault(x => x.rfqTypeID == rfqTypeID);
        }

        public rfqtype GetRFQ(string prefix)
        {
            return this._dbContext.rfqtypes.FirstOrDefault(x => x.Prefix == prefix);
        }

        public IList<sps_GetBidsForQuote_Result> GetRFQBids(string rfqReference)
        {
            return this._dbContext.sps_GetBidsForQuote(rfqReference).ToList();
        }

        public IList<sps_GetHighestBidsForQuote_Result> GetHighestRFQBids(string rfqReference)
        {
            return this._dbContext.sps_GetHighestBidsForQuote(rfqReference).ToList();
        }

        public int MyActiveRFQ(int userID)
        {
            return this._dbContext.rfqs.Where(x => x.userID == userID && x.status == "ACT").Count();
        }

        public void AddMetaData(string rfqReference, string metaDataName, string metaDataValue)
        {
            this._dbContext.metadatas.Add(new metadata()
            {
                ownerType = "RFQ",
                ownerTypeID = rfqReference,
                dateCreated = DateTime.Now,
                dateUpdated = DateTime.Now,
                metaDataName = metaDataName,
                metaDataValue = metaDataValue
            });
            this._dbContext.SaveChanges();
        }

        public void AddMetaData(string rfqReference, List<metadata> metaData)
        {
            foreach (var meta in metaData)
            {
                this._dbContext.metadatas.Add(new metadata()
                {
                    ownerType = "RFQ",
                    ownerTypeID = rfqReference,
                    dateCreated = DateTime.Now,
                    dateUpdated = DateTime.Now,
                    metaDataName = meta.metaDataName,
                    metaDataValue = meta.metaDataValue
                });
                this._dbContext.SaveChanges();
            }
            
        }

        public List<metadata> GetMetaData(string rfqReference, List<string> metaDataNames)
        {
            var result = (from metadata in this._dbContext.metadatas
                          where metaDataNames.Contains(metadata.metaDataName) && metadata.ownerTypeID == rfqReference && metadata.ownerType == "RFQ" select metadata).ToList();

            return result;
        }
    }
}
