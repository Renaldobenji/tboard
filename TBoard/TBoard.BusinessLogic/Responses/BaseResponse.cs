using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.BusinessLogic.Responses
{
    public class BaseResponse
    {
        public bool IsSuccessful { get; set; }
        public string ErrorMessage { get; set; }
    }
}
