using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Model
{
    public class OrganizationDocumentsDTO
    {
        public int documentID { get; set; }
        public Nullable<int> documentTypeID { get; set; }
        public Nullable<System.DateTime> dateCreated { get; set; }        
        public Nullable<int> organizationID { get; set; }
        public Nullable<System.DateTime> expiryDate { get; set; }
        public Nullable<sbyte> verified { get; set; }

        public string documenttype { get; set; }
    }
}
