//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TBoard.Data.Model.Refactored
{
    using System;
    
    public partial class sps_GetBidsForQuote_Result
    {
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<System.DateTime> SupplyTime { get; set; }
        public Nullable<System.DateTime> DeliveryTime { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string name { get; set; }
        public Nullable<bool> oem { get; set; }
        public Nullable<int> OrganizationID { get; set; }
        public Nullable<int> AverageRating { get; set; }
        public int QuoteID { get; set; }
    }
}