using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class RFQBusinessLogic : BusinessLogic<TBoard.Data.Model.rfq>
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
    }
}
