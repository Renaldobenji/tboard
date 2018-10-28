using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class RFQBusinessLogic : BusinessLogic<rfq>
    {
        private RFQRepository repository;

        public RFQBusinessLogic(IUnitOfWork unitOfWork, RFQRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public IList<rfqtype> GetAllRFQTypes()
        {
            return this.repository.GetAllRFQTypes();
        }

        public rfqtype GetRFQ(int rfqTypeID)
        {
            return this.repository.GetRFQ(rfqTypeID);
        }

        public rfqtype GetRFQ(string prefix)
        {
            return this.repository.GetRFQ(prefix);
        }

        public IList<sps_GetBidsForQuote_Result> GetRFQBids(string rfqReference)
        {
            return this.repository.GetRFQBids(rfqReference);
        }

        public IList<sps_GetHighestBidsForQuote_Result> GetHighestRFQBids(string rfqReference)
        {
            return this.repository.GetHighestRFQBids(rfqReference);
        }

        public int MyActiveRFQ(int userID)
        {
            return this.repository.MyActiveRFQ(userID);
        }

        public List<metadata> GetMetaData(string rfqReference, List<string> metaDataNames)
        {
            return this.repository.GetMetaData(rfqReference, metaDataNames);
        }

        public void AddMetaData(string rfqReference, string metaDataName, string metaDataValue)
        {
            this.repository.AddMetaData(rfqReference, metaDataName, metaDataValue);
        }

        public void AddMetaData(string rfqReference, List<metadata> metaData)
        {
            this.repository.AddMetaData(rfqReference, metaData);
        }
    }
}
