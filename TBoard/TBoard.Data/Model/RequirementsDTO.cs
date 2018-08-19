using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Model
{
    public class RequirementsDTO
    {
        public string RequirementType { get; set; }
        public string RequirementName { get; set; }
        public string CreatedDate { get; set; }
        public string ResolvedDate { get; set; }
    }
}
