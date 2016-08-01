using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class QuoteBusinessLogic : BusinessLogic<TBoard.Data.Model.quote>
    {
        private QuoteRepository repository;
        public QuoteBusinessLogic(IUnitOfWork unitOfWork, QuoteRepository repository) : base(unitOfWork,repository)
        {
            this.repository = repository;
        }

        public IList<sps_getRFQOwnerDetails_Result> GetQuoteOwnerDetails(string rfqReference)
        {
            return this.repository.GetQuoteOwnerDetails(rfqReference);
        }

        public int GetActiveBids(int userID)
        {
            return this.repository.GetActiveBids(userID);
        }

        public IList<quote> GetMyActiveBids(int userID)
        {
            return this.repository.GetMyActiveBids(userID);
        }

    }
}
