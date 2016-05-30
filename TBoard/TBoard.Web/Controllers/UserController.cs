using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;

namespace TBoard.Web.Controllers
{
    public class UserController : ApiController
    {
        private UserBusinessLogic userBusinessLogic;
        public UserController(UserBusinessLogic userBusinessLogic)
        {
            this.userBusinessLogic = userBusinessLogic;
        }
        
        // GET api/<controller>/5
        [Route("api/User/GetByOrganization/{id}")]
        public HttpResponseMessage GetByOrganization(int id)
        {
            var userArray = this.userBusinessLogic.FindBy(x => x.organizationID == id).Select(x => new
            {
                Username = x.username,
                FirstName = x.firstname,
                Surname = x.surname,
                IDNumber = x.identificationNumber,
                Created = x.created.ToString("yyyy-MM-dd"),
                IsApproved = (x.isApproved ? "True" : "False")
            }).ToList();

            var r = new
            {
                data = userArray
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        // POST api/<controller>
        public string Post(FormDataCollection formData)
        {
            var orgID = Convert.ToInt32(formData.Get("OrganizationID"));

            var userResponse = userBusinessLogic.CreateUser(formData.Get("Username"), formData.Get("Name"),
                        formData.Get("Surname"), formData.Get("Password"), formData.Get("Title"), formData.Get("IDNumber"), orgID);

            return JsonConvert.SerializeObject(userResponse, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
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