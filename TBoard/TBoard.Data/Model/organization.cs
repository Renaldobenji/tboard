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
    
    public partial class organization
    {
        public organization()
        {
            this.documents = new HashSet<document>();
        }
    
        public int organizationID { get; set; }
        public string name { get; set; }
        public string tradingName { get; set; }
        public string registrationNumber { get; set; }
        public string vatNumber { get; set; }
        public string taxNumber { get; set; }
        public Nullable<int> organizationTypeID { get; set; }
        public Nullable<bool> oem { get; set; }
    
        public virtual organizationtype organizationtype { get; set; }
        public virtual ICollection<document> documents { get; set; }
    }
}
