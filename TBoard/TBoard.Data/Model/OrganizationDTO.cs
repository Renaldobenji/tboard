using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Model
{
    public class OrganizationDTO
    {
        public string organizationID { get; set; }
        public string name { get; set; }
        public string tradingName { get; set; }
        public string registrationNumber { get; set; }
        public string vatNumber { get; set; }
        public string taxNumber { get; set; }
        public Nullable<int> organizationTypeID { get; set; }
        public Nullable<bool> oem { get; set; }
    }
}
