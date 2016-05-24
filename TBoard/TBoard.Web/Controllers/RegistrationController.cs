using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using TBoard.BusinessLogic.BusinessLogic;

namespace TBoard.Web.Controllers
{
    public class RegistrationController : ApiController
    {
        private CommunicationBusinessLogic communicationBusinessLogic;
        private AddressBusinessLogic addressBusinessLogic;
        private UserBusinessLogic userBusinessLogic; 
        public RegistrationController(CommunicationBusinessLogic communicationBusinessLogic, AddressBusinessLogic addressBusinessLogic, UserBusinessLogic userBusinessLogic)
        {
            this.communicationBusinessLogic = communicationBusinessLogic;
            this.addressBusinessLogic = addressBusinessLogic;
            this.userBusinessLogic = userBusinessLogic;
        }
        // POST api/<controller>
        public void Post(FormDataCollection formData)
        {

        }
    }
}