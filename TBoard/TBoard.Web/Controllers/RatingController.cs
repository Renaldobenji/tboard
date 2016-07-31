using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using TBoard.Web.Attributes;

namespace TBoard.Web.Controllers
{
    public class RatingController : ApiController
    {
        private RatingBusinessLogic ratingBusinessLogic;
        public RatingController(RatingBusinessLogic ratingBusinessLogic)
        {
            this.ratingBusinessLogic = ratingBusinessLogic;
        }

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [Route("api/Rating/{ownerType}/{ownerID}")]
        [JWTTokenValidation]
        public string Get(string ownerType, string ownerID)
        {
            IList<rating> rating = this.ratingBusinessLogic.FindBy(x => x.ownerType == ownerType && x.owningID == ownerID).ToList();
            if (rating == null)
                return "";

            return JsonConvert.SerializeObject(rating, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        // POST api/<controller>
        [JWTTokenValidation]
        public void Post(FormDataCollection formData)
        {
            rating rating = new rating();
            rating.ownerType = formData.Get("ownerType");
            rating.owningID = formData.Get("owningID");
            rating.rating1 = Decimal.ToInt32(Convert.ToDecimal(formData.Get("rating1")));
            rating.comment = formData.Get("comment");
            rating.dateCreated = DateTime.Now;

            this.ratingBusinessLogic.Create(rating);
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