using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;
using static TBoard.Data.Repository.QuoteRepository;

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

        public void AcceptBid(int userID, string rfqID, int quoteID)
        {
            this.repository.AcceptBid(userID, rfqID, quoteID);
        }


        public int GetAcceptedBidsCount(int userID)
        {
            return this.repository.GetAcceptedBidsCount(userID);
        }

        public int GetBidsWonCount(int userID)
        {
            return this.repository.GetBidsWonCount(userID);
        }

        public IList<AcceptedBidDetails> GetAcceptedBids(int userID)
        {
            return this.repository.GetAcceptedBids(userID);
        }

        public IList<AcceptedBidDetails> GetBidsWon(int userID)
        {
            return this.repository.GetBidsWon(userID);
        }

        public IList<sps_GetQuoteOwnerDetails_Result> GetQuoteOwnerDetails(int quoteID)
        {
            return this.repository.GetQuoteOwnerDetails(quoteID);
        }
    }
}
