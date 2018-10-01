using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;
using TBoard.Web.Models;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class MetaDataBusinessLogic : BusinessLogic<metadata>
    {
        private MetaDataRepository repository;

        public MetaDataBusinessLogic(IUnitOfWork unitOfWork, MetaDataRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

       public IList<metadata> GetMetaDataByMetaDataName(FetchMetaData metaDataToFetch)
        {
            return repository.GetMetaDataForMetaDataNames(metaDataToFetch.OwnerID, metaDataToFetch.MetaDataNames);
        }

    
        public int MetaDataScoringSystem(FetchMetaData weightingMetaDataToFetch, FetchMetaData ratingMetaData)
        {
            var weightingJSON = this.GetMetaDataByMetaDataName(weightingMetaDataToFetch);
            var ratingMetaDataValues = this.GetMetaDataByMetaDataName(ratingMetaData);
        }

    }
}
