using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class QuoteRepository : Repository<Model.quote>
    {
        public QuoteRepository(TBoardEntities dbContext)
            : base(dbContext)
        {
                
        }

        public IList<sps_getRFQOwnerDetails_Result> GetQuoteOwnerDetails(string rfqReference)
        {
            return this._dbContext.sps_getRFQOwnerDetails(rfqReference).ToList();
        }

        public int GetActiveBids(int userID)
        {
            var todayDate = DateTime.Now;
            var bidCount = (from q in this._dbContext.quotes
                     join r in this._dbContext.rfqs on q.rfqReference equals r.reference
                     where q.userID == userID && r.status == "ACT" && (r.expiryDate >= todayDate || r.expiryDate == null)
                     group r by r.reference into mygroup
                    select mygroup).Count();
            return bidCount;
        }

        public IList<quote> GetMyActiveBids(int userID)
        {
            var todayDate = DateTime.Now;
            var myQuotes = (from q in this._dbContext.quotes
                            join r in this._dbContext.rfqs on q.rfqReference equals r.reference
                            where q.userID == userID && r.status == "ACT" && (r.expiryDate >= todayDate || r.expiryDate == null)                            
                            select q).ToList();
            return myQuotes;
        }

        public void AcceptBid(int userID, string rfqID, int quoteID)
        {
            rfq rfqInQuestion = this._dbContext.rfqs.Where(x => x.reference == rfqID).First();
            rfqInQuestion.status = "ACCEPTED";           

            quotestatu status = new quotestatu();
            status.quoteID = quoteID;
            status.userID = userID;
            status.rfqID = rfqInQuestion.rfqID;
            status.status = "ACCEPTED";
            status.quoteStatusDateTime = DateTime.Now;
            this._dbContext.quotestatus.Add(status);

            this._dbContext.SaveChanges();
        }
    }
}
