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
using TBoard.Web.Attributes;

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
        [JWTTokenValidation]
        [Route("api/User/GetByOrganization/{id}")]
        public HttpResponseMessage GetByOrganization(int id)
        {
            var userArray = this.userBusinessLogic.FindBy(x => x.organizationID == id).Select(x => new
            {
                UserID = x.userID,
                Username = x.username,
                FirstName = x.firstname,
                Surname = x.surname,
                IDNumber = x.identificationNumber,
                Created = x.created.ToString("yyyy-MM-dd"),
                IsApproved = (x.isApproved ? "True" : "False"),
                DepartmentCode = x.departmentCode,
                EmployeeNumber = x.employeeCode
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
        [JWTTokenValidation]
        public string Post(FormDataCollection formData)
        {
            var orgID = Convert.ToInt32(formData.Get("OrganizationID"));

            var userResponse = userBusinessLogic.CreateUser(formData.Get("Username"), formData.Get("Name"),
                        formData.Get("Surname"), formData.Get("Password"), formData.Get("Title"), formData.Get("IDNumber"), orgID, formData.Get("EmployeeNumber"), formData.Get("DepartmentCode"));

            return JsonConvert.SerializeObject(userResponse, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }

        [JWTTokenValidation]
        [HttpPost]
        [Route("api/User/Update")]
        public void Update(FormDataCollection formData)
        {
            var id = Convert.ToInt32(formData.Get("UserID"));

            var userObject = userBusinessLogic.FindBy(x => x.userID == id).First();

            userObject.firstname = formData.Get("FirstName");
            userObject.surname = formData.Get("Surname");
            userObject.identificationNumber = formData.Get("IDNumber");
            userObject.employeeCode = formData.Get("EmployeeNumber");
            userObject.departmentCode = formData.Get("DepartmentCode");

            userBusinessLogic.Update(userObject);
        }

        [JWTTokenValidation]
        [Route("api/User/GetUserInformation/{id}")]
        public HttpResponseMessage GetUserInformation(int id)
        {
            var userArray = this.userBusinessLogic.FindBy(x => x.userID == id).Select(x => new
            {
                UserID = x.userID,
                Username = x.username,
                FirstName = x.firstname,
                Surname = x.surname,
                IDNumber = x.identificationNumber,
                Created = x.created.ToString("yyyy-MM-dd"),
                IsApproved = (x.isApproved ? "True" : "False"),
                DepartmentCode = x.departmentCode,
                EmployeeNumber = x.employeeCode
            }).FirstOrDefault();

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

        [JWTTokenValidation]
        [HttpGet]
        [Route("api/User/DeactivateUser/{id}")]
        public HttpResponseMessage DeactivateUser(int id)
        {
            var userObject = this.userBusinessLogic.FindBy(x => x.userID == id).FirstOrDefault();

            userObject.isApproved = false;

            this.userBusinessLogic.Update(userObject);
            var r = new
            {
                data = "Successful"
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        [JWTTokenValidation]
        [HttpGet]
        [Route("api/User/ApproveUser/{id}")]
        public HttpResponseMessage ApproveUser(int id)
        {
            var userObject = this.userBusinessLogic.FindBy(x => x.userID == id).FirstOrDefault();

            userObject.isApproved = true;

            this.userBusinessLogic.Update(userObject);

            var r = new
            {
                data = "Successful"
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
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