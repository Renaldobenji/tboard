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
    
    public partial class expertisesubcategory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public expertisesubcategory()
        {
            this.expertiseownerships = new HashSet<expertiseownership>();
            this.rfqs = new HashSet<rfq>();
        }
    
        public int ExpertiseSubCategoryID { get; set; }
        public string Name { get; set; }
        public Nullable<int> ExpertiseCategoryID { get; set; }
    
        public virtual expertisecategory expertisecategory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<expertiseownership> expertiseownerships { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rfq> rfqs { get; set; }
    }
}