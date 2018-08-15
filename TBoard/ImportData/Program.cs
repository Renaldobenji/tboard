using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using TBoard.Data;

namespace ImportData
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] lines = File.ReadAllLines(@"ExpertiseList2.txt", Encoding.UTF8);
            var entities = new TBoard.Data.Model.TBoardEntities();

            foreach (var line in lines)
            {
                int catID;
                string[] catItem = line.Split('|');
                string catitem1 = catItem[0];
                string catitem2 = catItem[1];
                var cat1 = entities.expertisecategories.Where(x => x.Name == catitem1).FirstOrDefault();

                if (cat1 == null)
                {
                    var sub = new TBoard.Data.Model.expertisecategory()
                    {
                        Name = catItem[0]
                    };

                    entities.expertisecategories.Add(sub);
                    entities.SaveChanges();
                    catID = sub.ExpertiseCategoryID;
                }
                else
                {
                    catID = cat1.ExpertiseCategoryID;
                }



                var cat2 = entities.expertisesubcategories.Where(x => x.Name == catitem2).FirstOrDefault();
                if (cat2 == null)
                {
                    entities.expertisesubcategories.Add(new TBoard.Data.Model.expertisesubcategory()
                    {
                        Name = catitem2,
                        ExpertiseCategoryID = catID
                    });
                    entities.SaveChanges();
                }



            }
        }
    }
}
