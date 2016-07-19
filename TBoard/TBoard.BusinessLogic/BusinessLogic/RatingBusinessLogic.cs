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
    public class RatingBusinessLogic : BusinessLogic<TBoard.Data.Model.rating>
    {
        private RatingRepository repository;

        public RatingBusinessLogic(IUnitOfWork unitOfWork, RatingRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }
    }
}
