using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class BankAccountTypeBusinessLogic : BusinessLogic<bankaccounttype>
    {
        private BankAccountTypesRepository repository;

        public BankAccountTypeBusinessLogic(IUnitOfWork unitOfWork, BankAccountTypesRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }
    }
}
