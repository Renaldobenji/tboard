using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class UserBusinessLogic : BusinessLogic<user>
    {
        private UserRepository repository;

        public UserBusinessLogic(IUnitOfWork unitOfWork, UserRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

    
    }
}
