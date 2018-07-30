using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.BusinessLogic.Responses;
using TBoard.Data.Model;
using TBoard.Web.Attributes;

namespace TBoard.Web.Controllers
{
    public class UserController : ApiController
    {
        private UserBusinessLogic userBusinessLogic;
        private CommunicationBusinessLogic communicationBusinessLogic;
        private EmailQueueBusinessLogic emailQueueBusinessLogic;
        public UserController(UserBusinessLogic userBusinessLogic, CommunicationBusinessLogic communicationBusinessLogic, EmailQueueBusinessLogic emailQueueBusinessLogic)
        {
            this.userBusinessLogic = userBusinessLogic;
            this.communicationBusinessLogic = communicationBusinessLogic;
            this.emailQueueBusinessLogic = emailQueueBusinessLogic;
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

            userBusinessLogic.AddUserToGroup(userResponse.UserID, "SubordinateAccess");

            if (!formData.Get("Email").Equals(""))
            {
                this.emailQueueBusinessLogic.SendEmail("support@tenderboard.co.za", formData.Get("Email"), "Registration Complete", createEmailBody(formData.Get("Username"), formData.Get("Password")));
            }

            return JsonConvert.SerializeObject(userResponse, Formatting.Indented,
                                                new JsonSerializerSettings
                                                {
                                                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                                                });
        }
        

        private string createEmailBody(string username, string password)
        {
            string body = string.Empty;
            //using streamreader for reading my htmltemplate   
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Content/EmailTemplates/registration.html")))
            {

                body = reader.ReadToEnd();
            }

            body = body.Replace("{username}", username); //replacing the required things     
            body = body.Replace("{password}", password); //replacing the required things            

            return body;
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
        [HttpPost]
        [Route("api/User/Update/ContactInformation")]
        public void ContactInformation(FormDataCollection formData)
        {
            var id = Convert.ToInt32(formData.Get("UserID"));

            var userObject = userBusinessLogic.FindBy(x => x.userID == id).First();           

            addCommunicationBasedOnType(formData, formData.Get("UserID"), "CellNumber", "CELL");
            addCommunicationBasedOnType(formData, formData.Get("UserID"), "HomeNumber", "HME");
            addCommunicationBasedOnType(formData, formData.Get("UserID"), "OfficeNumber", "WRK");
            addCommunicationBasedOnType(formData, formData.Get("UserID"), "EmailAddress", "EML");
        }

        private void addCommunicationBasedOnType(FormDataCollection formData, string userID, string formField, string communicationType)
        {
            if (!string.IsNullOrEmpty(formData.Get(formField)))
            {               
                this.addCommunication("PER", userID, formData.Get(formField), communicationType);
            }
        }

        private void addCommunication(string owingType, string owningID, string communicationLine1,
            string communicationType)
        {           
            communication comm = new communication();
            comm.owningType = owingType;
            comm.owningID = owningID;
            comm.communicationLine1 = communicationLine1;
            if (communicationType.Equals("CELL"))
            {
                comm.communicationTypeID = 1;
            }
            else if (communicationType.Equals("WRK"))
            {
                comm.communicationTypeID = 2;
            }
            else if (communicationType.Equals("HME"))
            {
                comm.communicationTypeID = 3;
            }
            else if (communicationType.Equals("EML"))
            {
                comm.communicationTypeID = 4;
            }

            var isExistObject = this.communicationBusinessLogic.FindBy(x => x.owningType == owingType && x.owningID == owningID && x.communicationTypeID == comm.communicationTypeID).FirstOrDefault();
            if (isExistObject == null)
            {
                this.communicationBusinessLogic.Create(comm);
            }
            else
            {
                isExistObject.communicationLine1 = communicationLine1;
                this.communicationBusinessLogic.Update(isExistObject);
            }
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

            var communication = this.communicationBusinessLogic.FindBy(x => x.owningType == "PER" && x.owningID == id.ToString()).ToList();

            var contactInformation = new {
                HomeNumber = communication.Where(x => x.communicationTypeID == 3).Select(y => y.communicationLine1).FirstOrDefault(),
                CellNumber = communication.Where(x => x.communicationTypeID == 1).Select(y => y.communicationLine1).FirstOrDefault(),
                OfficeNumber = communication.Where(x => x.communicationTypeID == 2).Select(y => y.communicationLine1).FirstOrDefault(),
                Email = communication.Where(x => x.communicationTypeID == 4).Select(y => y.communicationLine1).FirstOrDefault()
            };
            var r = new
            {
                data = userArray,
                contactInformation = contactInformation
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

        
        [HttpGet]
        [Route("api/User/OrganizationCompleteness/{id}")]
        public HttpResponseMessage OrganizationCompleteness(int id)
        {
            var percComplete = this.userBusinessLogic.GetOrganizationCompleteness(id);
            
            var r = new
            {
                data = Math.Round(percComplete)
            };

            var resp = new HttpResponseMessage()
            {
                Content = new StringContent(JsonConvert.SerializeObject(r))
            };
            resp.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return resp;
        }

        [HttpGet]
        [Route("api/User/ProfileCompleteness/{id}")]
        public HttpResponseMessage ProfileCompleteness(int id)
        {
            var percComplete = this.userBusinessLogic.GetUserProfileCompleteness(id);

            var r = new
            {
                data = Math.Round(percComplete)
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