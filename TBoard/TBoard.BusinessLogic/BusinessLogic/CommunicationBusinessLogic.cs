using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class CommunicationBusinessLogic : BusinessLogic<TBoard.Data.Model.communication>
    {
        private CommunicationRepository repository;
        public CommunicationBusinessLogic(IUnitOfWork unitOfWork, CommunicationRepository repository) : base(unitOfWork,repository)
        {
            this.repository = repository;
        }
    }
}
