using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;

namespace TBoard.Web.Controllers
{
    public class ExpertiseCategoryController : ApiController
    {
        private ExpertiseCategoryBusinessLogic expertiseCategoryBusinessLogic;
        public ExpertiseCategoryController(ExpertiseCategoryBusinessLogic expertiseCategoryBusinessLogic)
        {
            this.expertiseCategoryBusinessLogic = expertiseCategoryBusinessLogic;
        }
        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            var expertiseList = expertiseCategoryBusinessLogic.GetAll().ToList().SelectMany(x => x.expertisesubcategories).Select(y => new
            {
                SubCategoryName = string.Format("{0} - {1}", y.expertisecategory.Name, y.Name),
                ExpertiseSubCategoryID = y.ExpertiseSubCategoryID
            });
            
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

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
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