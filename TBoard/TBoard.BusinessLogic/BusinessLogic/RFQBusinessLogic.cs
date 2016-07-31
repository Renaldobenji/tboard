﻿using System;
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

        public rfqtype GetRFQ(string prefix)
        {
            return this.repository.GetRFQ(prefix);
        }

        public IList<sps_GetBidsForQuote_Result> GetRFQBids(string rfqReference)
        {
            return this.repository.GetRFQBids(rfqReference);
        }
        public int MyActiveRFQ(int userID)
        {
            return this.repository.MyActiveRFQ(userID);
        }
    }
}
