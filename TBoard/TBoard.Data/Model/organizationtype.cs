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
    
    public partial class organizationtype
    {
        public organizationtype()
        {
            this.organizations = new HashSet<organization>();
        }
    
        public int organizationTypeID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    
        public virtual ICollection<organization> organizations { get; set; }
    }
}
