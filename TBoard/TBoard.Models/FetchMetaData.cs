using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TBoard.Web.Models
{
    public class FetchMetaData
    {
        public List<string> MetaDataNames { get; set; }

        public string OwnerID { get; set; }
    }
}