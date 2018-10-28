using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model.Refactored;
using System.Web;
using TBoard.Web.Attributes;
using TBoard.Web.Helpers;

namespace TBoard.Web.Controllers
{
    public class ExpertiseCategoryController : ApiController
    {
        private ExpertiseCategoryBusinessLogic expertiseCategoryBusinessLogic;
        private ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic;
        private RequirementBusinessLogic requirementBusinessLogic;
        public ExpertiseCategoryController(ExpertiseCategoryBusinessLogic expertiseCategoryBusinessLogic, ExpertiseOwnershipBusinessLogic expertiseOwnershipBusinessLogic, RequirementBusinessLogic requirementBusinessLogic)
        {
            this.expertiseCategoryBusinessLogic = expertiseCategoryBusinessLogic;
            this.expertiseOwnershipBusinessLogic = expertiseOwnershipBusinessLogic;
            this.requirementBusinessLogic = requirementBusinessLogic;
        }
        // GET api/<controller>
        [JWTTokenValidation]
        public HttpResponseMessage Get()
        {

            
           /* var expertiseList = expertiseCategoryBusinessLogic.GetAll().ToList().SelectMany(x => x.expertisesubcategories).Select(y => new
            {
                SubCategoryName = string.Format("{0} - {1}", y.expertisecategory.Name, y.Name),
                ExpertiseSubCategoryID = y.ExpertiseSubCategoryID
            });*/

            var expertiseList = expertiseCategoryBusinessLogic.GetExpertise();

           /*.Select();*/
           var response = new
            {
                data = expertiseList.OrderBy(i => i.SubCategoryName)
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(response, Formatting.None,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                }))
            };

            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        [Route("api/ExpertiseCategory/GetExpertiseCategory/{ownerType}/{ownerID}")]
        [JWTTokenValidation]
        public HttpResponseMessage GetExpertiseCategory(string ownerType, string ownerID)
        {
            string ownerIDs = EncryptionHelper.Decrypt(ownerID);


            var ownershipCat =
                this.expertiseOwnershipBusinessLogic.FindBy(x => x.ownerType == ownerType && x.owningID == ownerIDs)
                    .ToList();
                    
            
            if (ownershipCat.Count > 0)
            {
                var r = new
                {
                    data = ownershipCat.Select(y => new
                    {
                        Name = string.Format("{0} - {1}", y.expertisesubcategory.expertisecategory.Name, y.expertisesubcategory.Name),
                        Key = y.expertiseSubCategoryID
                    })
                };
                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(r))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                return resp;
            }
            else
            {
                IList < string > array = new List<string>();
               
                var resp = new HttpResponseMessage()
                {
                    Content = new StringContent(JsonConvert.SerializeObject(array))
                };
                resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                return resp;
            }
        }

        [Route("api/ExpertiseCategory/GetExpertiseLike/")]
        [JWTTokenValidation]
        public HttpResponseMessage GetExpertiseLike([FromUri] string q)
        {          

            var result = this.expertiseCategoryBusinessLogic.GetExpertiseLike(q);

            var r = new
            {
                items = result
            };
            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        // POST api/<controller>
        [JWTTokenValidation]
        public void Post(FormDataCollection formData)
        {
            var orgID = formData.Get("Organization");
            foreach (var userCat in formData)
            {
                if (userCat.Key.Contains("UserCategories"))
                {
                    var subCatID = Convert.ToInt32(userCat.Value);
                    var exists =
                        expertiseOwnershipBusinessLogic.FindBy(x => x.ownerType == "ORG" && x.owningID == orgID && x.expertiseSubCategoryID == subCatID)
                            .ToList();

                    if (exists.Count == 0)
                    {
                        expertiseOwnershipBusinessLogic.Create(new expertiseownership()
                        {
                            ownerType = "ORG",
                            owningID = orgID,
                            expertiseSubCategoryID = Convert.ToInt32(userCat.Value)
                        });

                        this.requirementBusinessLogic.RaiseRequirement("ORG", orgID, "Expertise", userCat.Value);
                    }
                }

            }
        }

        [HttpPost]
        [JWTTokenValidation]
        [Route("api/ExpertiseCategory/Add")]
        public void Add(FormDataCollection formData)
        {
            this.expertiseCategoryBusinessLogic.AddUserExpertise(formData.Get("ExpertiseName"));
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}