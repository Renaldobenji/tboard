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
    
    public partial class document
    {
        public int documentID { get; set; }
        public Nullable<int> documentTypeID { get; set; }
        public Nullable<System.DateTime> dateCreated { get; set; }
        public string documentPath { get; set; }
        public Nullable<int> organizationID { get; set; }
        public Nullable<System.DateTime> expiryDate { get; set; }
        public Nullable<System.DateTime> verified { get; set; }
    
        public virtual documenttype documenttype { get; set; }
        public virtual organization organization { get; set; }
    }
}
