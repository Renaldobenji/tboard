using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
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
            var weightingJSON = this.GetMetaDataByMetaDataName(weightingMetaDataToFetch).FirstOrDefault();
            var ratingMetaDataValues = this.GetMetaDataByMetaDataName(ratingMetaData);

            int total = 0;
            JObject weighting = JObject.Parse(weightingJSON.metaDataValue);

            foreach (var value in ratingMetaDataValues)
            {
                string jsonMetaDataValue = (string)weighting[value.metaDataName];
                if (!string.IsNullOrEmpty(jsonMetaDataValue))
                {
                    var multipleScoringFacets = jsonMetaDataValue.Split(',');
                    foreach (var multiple in multipleScoringFacets)
                    {
                        var score = multiple.Split('$');
                        if (score[0] == value.metaDataValue)
                        {
                            total += Convert.ToInt32(score[1]);
                        }
                    }
                   
                }
            }

            return total;
        }
    }
}
