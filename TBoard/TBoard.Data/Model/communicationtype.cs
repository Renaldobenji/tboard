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
    
    public partial class communicationtype
    {
        public communicationtype()
        {
            this.communications = new HashSet<communication>();
        }
    
        public int communicationTypeID { get; set; }
        public string communicationTypeTLA { get; set; }
        public string communicationTypeDescription { get; set; }
    
        public virtual ICollection<communication> communications { get; set; }
    }
}
