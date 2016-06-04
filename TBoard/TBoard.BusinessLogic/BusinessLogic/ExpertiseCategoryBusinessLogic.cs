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
    public class ExpertiseCategoryBusinessLogic : BusinessLogic<TBoard.Data.Model.expertisecategory>
    {
        private ExpertiseCategoryRepository repository;

        public ExpertiseCategoryBusinessLogic(IUnitOfWork unitOfWork, ExpertiseCategoryRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }
    }
}
