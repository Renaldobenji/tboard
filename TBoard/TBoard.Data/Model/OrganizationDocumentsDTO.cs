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
        public int documentTypeID { get; set; }
        public System.DateTime dateCreated { get; set; }        
        public int organizationID { get; set; }
        public String organizationName { get; set; }
        public Nullable<System.DateTime> expiryDate { get; set; }
        public Nullable<System.DateTime> verified { get; set; }

        public string documenttype { get; set; }
    }
}
