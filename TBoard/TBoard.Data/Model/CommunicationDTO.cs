using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Model
{
    public class CommunicationDTO
    {
        public long communicationID { get; set; }
        public string owningType { get; set; }
        public string owningID { get; set; }       
        public string Home { get; set; }
        public string CellPhone { get; set; }
        public string WorkPhone { get; set; }
        public string Email { get; set; }        
        public string role { get; set; }
    }
}
