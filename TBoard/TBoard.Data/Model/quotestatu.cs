//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TBoard.Data.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class quotestatu
    {
        public int quoteStatusID { get; set; }
        public Nullable<int> rfqID { get; set; }
        public Nullable<int> quoteID { get; set; }
        public string status { get; set; }
        public Nullable<System.DateTime> quoteStatusDateTime { get; set; }
        public Nullable<int> userID { get; set; }
    
        public virtual quote quote { get; set; }
        public virtual rfq rfq { get; set; }
    }
}
