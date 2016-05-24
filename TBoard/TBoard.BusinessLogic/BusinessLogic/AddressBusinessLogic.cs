using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class AddressBusinessLogic : BusinessLogic<TBoard.Data.Model.address>
    {
        private AddressRepository repository;

        public AddressBusinessLogic(IUnitOfWork unitOfWork, AddressRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }
    }
}
