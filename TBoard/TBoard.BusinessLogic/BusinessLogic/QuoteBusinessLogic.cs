using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class QuoteBusinessLogic : BusinessLogic<TBoard.Data.Model.quote>
    {
        private QuoteRepository repository;
        public QuoteBusinessLogic(IUnitOfWork unitOfWork, QuoteRepository repository) : base(unitOfWork,repository)
        {
            this.repository = repository;
        }
    }
}
