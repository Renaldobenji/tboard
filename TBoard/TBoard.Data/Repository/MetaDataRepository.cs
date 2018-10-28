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
    public class MetaDataRepository: Repository<metadata>
    {
        public MetaDataRepository(TBoardEntitiesSQL dbContext)
           : base(dbContext)
        {

        }

        public IList<metadata> GetMetaDataForMetaDataNames(string ownerTypeID, List<string> metaDataNames)
        {
            var result = from metadata in this._dbContext.metadatas   //this._dbContext.metadatas.Where(x => x.ownerTypeID = ownerID && metaDataNames.Contains(x=x.metaDataName));
                         where metaDataNames.Contains(metadata.metaDataName)
                         && metadata.ownerTypeID == ownerTypeID
                         select metadata;

            return result.ToList();
        }
    }
}
