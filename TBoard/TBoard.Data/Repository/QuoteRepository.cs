﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class QuoteRepository : Repository<quote>
    {
        public QuoteRepository(TBoardEntitiesSQL dbContext)
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

        public void AcceptBid(int userID, string rfqID, int quoteID, string metaData)
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

            if (!string.IsNullOrEmpty(metaData))
            {
                var items = metaData.Split(',');
                foreach (var i in items)
                {
                    this._dbContext.metadatas.Add(new metadata()
                    {
                        ownerType = "QUOTE",
                        ownerTypeID = quoteID.ToString(),
                        dateCreated = DateTime.Now,
                        dateUpdated = DateTime.Now,
                        metaDataName = i,
                        metaDataValue = "TRUE"
                    });
                }
            }

            //this._dbContext.SaveChanges();
        }

        public void PayBid(int userID, string rfqID, int quoteID)
        {
            rfq rfqInQuestion = this._dbContext.rfqs.Where(x => x.reference == rfqID).First();
            rfqInQuestion.status = "PAID";

            quotestatu status = new quotestatu();
            status.quoteID = quoteID;
            status.userID = userID;
            status.rfqID = rfqInQuestion.rfqID;
            status.status = "PAID";
            status.quoteStatusDateTime = DateTime.Now;
            this._dbContext.quotestatus.Add(status);

            this._dbContext.SaveChanges();
        }

        public int? GetQuoteID(string rfqReference)
        {
            var data = (from qs in this._dbContext.quotestatus
                        join rfqs in this._dbContext.rfqs on qs.rfqID equals rfqs.rfqID                        
                        where qs.status == "Accepted" && rfqs.reference == rfqReference
                        select qs.quoteID).FirstOrDefault();

            return data;
        }

        public IList<AcceptedBidDetails> GetAcceptedBids(int userID)
        {
            var data = (from qs in this._dbContext.quotestatus
                        join rfqs in this._dbContext.rfqs on qs.rfqID equals rfqs.rfqID
                        join q in this._dbContext.quotes on qs.quoteID equals q.quoteID
                        join u in this._dbContext.users on qs.userID equals u.userID
                        where rfqs.userID == userID && rfqs.status == "ACCEPTED"
                        select new AcceptedBidDetails()
                        {
                            quoteStatusDateTime = qs.quoteStatusDateTime.ToString(),
                            name = u.firstname + " " + u.surname,
                            reference = rfqs.reference,
                            dateCreated = rfqs.dateCreated.ToString(),
                            amount = q.amount.ToString(),
                            deliveryTime = q.deliveryTime.ToString(),
                            supplyTime = q.supplyTime.ToString(),
                            rfqID = rfqs.rfqID.ToString(),
                            quoteID = q.quoteID.ToString(),
                            status = qs.status
                        }).ToList();

            return data;
        }

        public IList<AcceptedBidDetails> GetBidsWon(int userID)
        {
            var data = (from qs in this._dbContext.quotestatus
                        join rfqs in this._dbContext.rfqs on qs.rfqID equals rfqs.rfqID
                        join q in this._dbContext.quotes on qs.quoteID equals q.quoteID
                        join u in this._dbContext.users on qs.userID equals u.userID
                        where qs.status == "Accepted" && qs.userID == userID
                        select new AcceptedBidDetails()
                        {
                            quoteStatusDateTime = qs.quoteStatusDateTime.ToString(),
                            name = u.firstname + " " + u.surname,
                            reference = rfqs.reference,
                            dateCreated = rfqs.dateCreated.ToString(),
                            amount = q.amount.ToString(),
                            deliveryTime = q.deliveryTime.ToString(),
                            supplyTime = q.supplyTime.ToString(),
                            rfqID = rfqs.rfqID.ToString(),
                            quoteID = q.quoteID.ToString()
                        }).ToList();

            return data;
        }

        public IList<AcceptedBidDetails> GetBidsLost(int userID)
        {
            var data = (from qs in this._dbContext.quotestatus
                        join rfqs in this._dbContext.rfqs on qs.rfqID equals rfqs.rfqID
                        join q in this._dbContext.quotes on qs.quoteID equals q.quoteID
                        where qs.status == "Accepted" && qs.userID != userID 
                              && q.userID == userID
                        select new AcceptedBidDetails()
                        {
                            quoteStatusDateTime = qs.quoteStatusDateTime.ToString(),
                            reference = rfqs.reference,
                            dateCreated = rfqs.dateCreated.ToString(),
                            amount = q.amount.ToString(),
                            deliveryTime = q.deliveryTime.ToString(),
                            supplyTime = q.supplyTime.ToString(),
                            rfqID = rfqs.rfqID.ToString(),
                            quoteID = q.quoteID.ToString()
                        }).ToList();

            return data;
        }

        public int GetAcceptedBidsCount(int userID)
        {
            return (from qs in this._dbContext.quotestatus
                    join rfqs in this._dbContext.rfqs on qs.rfqID equals rfqs.rfqID                   
                        where rfqs.userID == userID && rfqs.status == "ACCEPTED"
                    select qs).Count();           
        }

        public int GetBidsWonCount(int userID)
        {
            return (from qs in this._dbContext.quotestatus
                    join u in this._dbContext.users on qs.userID equals u.userID
                    where qs.status == "Accepted" && qs.userID == userID
                    select qs).Count();
        }

        public IList<sps_GetQuoteOwnerDetails_Result> GetQuoteOwnerDetails(int quoteID)
        {
            return this._dbContext.sps_GetQuoteOwnerDetails(quoteID).ToList();
        }

        public IList<sps_GetQuoteHistory_Result> sps_GetQuoteHistory(int userID, string qStatus, string startDate, string endDate)
        {
            var stDate = Convert.ToDateTime(startDate);
            var eDate = Convert.ToDateTime(endDate);
            return this._dbContext.sps_GetQuoteHistory(userID,qStatus, stDate, eDate).ToList();
        }

        public class AcceptedBidDetails
        {
            public string quoteStatusDateTime { get; set; }
            public string name { get; set; }
            public string reference { get; set; }
            public string dateCreated { get; set; }
            public string amount { get; set; }
            public string deliveryTime { get; set; }
            public string supplyTime { get; set; }
            public string rfqID { get; set; }
            public string quoteID { get; set; }
            public string status { get; set; }

        }

    }
}
