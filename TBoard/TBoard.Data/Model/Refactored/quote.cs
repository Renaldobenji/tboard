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
    using System.Collections.Generic;
    
    public partial class quote
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public quote()
        {
            this.quotestatus = new HashSet<quotestatu>();
        }
    
        public int quoteID { get; set; }
        public string rfqReference { get; set; }
        public Nullable<int> userID { get; set; }
        public Nullable<System.DateTime> createdDate { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<System.DateTime> supplyTime { get; set; }
        public Nullable<System.DateTime> deliveryTime { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<quotestatu> quotestatus { get; set; }
    }
}
