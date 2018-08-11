using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TBoard.Web.Models
{
    public class VerifyDocuments
    {

        public int OrganizationID { get; set; }
        public string DocumentType { get; set; }
        public string DocumentURL { get; set; }
        public string OrganizationName { get; set; }
        public Boolean Verified { get; set; }
        

    }
}