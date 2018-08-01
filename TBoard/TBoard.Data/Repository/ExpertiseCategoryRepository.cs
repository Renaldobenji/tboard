using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class SearchSubCategory
    {
        public int ExpertiseSubCategoryID {get;set;}
        public String CategoryName { get; set; }
        public String SubCategoryName { get; set; }
    }

    public class ExpertiseCategoryRepository : Repository<expertisecategory>
    {
        public ExpertiseCategoryRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }

        public IList<sps_GetSubCategories_Result> GetExpertise()
        {
            return this._dbContext.sps_GetSubCategories().ToList() ;
        }

        public IList<SearchSubCategory> GetExpertiseLike(string q)
        {
            var var = (from x in this._dbContext.expertisesubcategories
                       where x.Name.Contains(q)
                       select new SearchSubCategory()
                       {
                           ExpertiseSubCategoryID = x.ExpertiseSubCategoryID,
                           CategoryName = x.expertisecategory.Name,
                           SubCategoryName = x.Name
                       }).ToList();

            return var;
        }

        public void AddUserExpertise(string expertiseName)
        {
            int UnknowSubCategoryId = this._dbContext.expertisecategories.Where(x => x.Name == "Unknown").Select(y => y.ExpertiseCategoryID).FirstOrDefault();
            expertisesubcategory sub = new expertisesubcategory();
            sub.Name = expertiseName;
            sub.ExpertiseCategoryID = UnknowSubCategoryId;
            this._dbContext.expertisesubcategories.Add(sub);
            this._dbContext.SaveChanges();
        }
    }
}
