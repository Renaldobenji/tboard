using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Repository;
using TBoard.Data.Model;

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

        public IList<sps_GetSubCategories_Result> GetExpertise()
        {
            return this.repository.GetExpertise();
        }

        public IList<SearchSubCategory> GetExpertiseLike(string q)
        {
            return this.repository.GetExpertiseLike(q);
        }

        public void AddUserExpertise(string expertiseName)
        {
            this.repository.AddUserExpertise(expertiseName);
        }
    }
}
