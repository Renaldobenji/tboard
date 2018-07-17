using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TBoard.BusinessLogic.Password;
using TBoard.BusinessLogic.Responses;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class UserBusinessLogic : BusinessLogic<user>
    {
        private UserRepository repository;
        private OrganizationRepository orgRepository;

        public UserBusinessLogic(IUnitOfWork unitOfWork, UserRepository repository, OrganizationRepository orgRepository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
            this.orgRepository = orgRepository;
        }


        public UserResponse CreateUser(string userName, string name, string surname, string password, string title, string idNumber)
        {
            UserResponse response = new UserResponse();
            string saltValue = "";
            var passwordHash = PasswordHasher.HashPassword(password, ref saltValue, new HMACMD5());

            user newUser = new user();
            newUser.username = userName;
            newUser.firstname = name;
            newUser.surname = surname;
            newUser.password = passwordHash;
            newUser.passwordSalt = saltValue;
            newUser.title = title;
            newUser.identificationNumber = idNumber;
            newUser.isApproved = false;
            newUser.lastActivityDate = DateTime.Now;
            newUser.lastPasswordChange = DateTime.Now;
            newUser.created = DateTime.Now;
            newUser.isLockedOut = "false";
            newUser.failedPasswordAttemptCount = 0;
            newUser.lastLoginDate = DateTime.Now;

            this.Create(newUser);

            response.UserID = newUser.userID;            

            return response;
        }

        public UserResponse CreateUser(string userName, string name, string surname, string password, string title, string idNumber, int organizationId, string employeeCode, string departmentCode)
        {
            UserResponse response = new UserResponse();
            string saltValue = "";
            var passwordHash = PasswordHasher.HashPassword(password, ref saltValue, new HMACMD5());

            try
            {
                user newUser = new user();
                newUser.username = userName;
                newUser.firstname = name;
                newUser.surname = surname;
                newUser.password = passwordHash;
                newUser.passwordSalt = saltValue;
                newUser.title = title;
                newUser.identificationNumber = idNumber;
                newUser.isApproved = false;
                newUser.lastActivityDate = DateTime.Now;
                newUser.lastPasswordChange = DateTime.Now;
                newUser.isLockedOut = "false";
                newUser.failedPasswordAttemptCount = 0;
                newUser.lastLoginDate = DateTime.Now;
                newUser.organizationID = organizationId;
                newUser.employeeCode = employeeCode;
                newUser.departmentCode = departmentCode;
                newUser.created = DateTime.Now;

                this.Create(newUser);

                response.UserID = newUser.userID;

                if (organizationId != 0)
                { this.orgRepository.MapUserToOrganization(organizationId, newUser.userID); }                

                response.IsSuccessful = true;
            }
            catch(Exception ex)
            {
                response.IsSuccessful = false;
                response.ErrorMessage = ex.Message;
            }           

            return response;
        }

        public IList<role> GetRolesForUser(int userID)
        {
            return this.repository.GetRolesForUser(userID);
        }

        public void AddUserToGroup(int userID, string groupCode)
        {
            this.repository.AddUserToGroup(userID, groupCode);
        }

        public IList<sps_GetAllUserInformation_Result> GetUserInformation(int userID)
        {
            return this.repository.GetUserInformation(userID);
        }

        public decimal GetUserProfileCompleteness(int userID)
        {
            var information = this.repository.GetUserInformation(userID);
            decimal totalCompleteness = 9;
            decimal totalCompletenessTally = 0;

            var check = information.Where(y => y.accountNumber != null).Select(x => x.accountNumber).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.addressLine1 != null).Select(x => x.addressLine1).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.branchCode != null).Select(x => x.branchCode).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.communicationLine1 != null).Select(x => x.communicationLine1).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.departmentCode != null).Select(x => x.departmentCode).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.employeeCode != null).Select(x => x.employeeCode).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.firstname != null).Select(x => x.firstname).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.identificationNumber != null).Select(x => x.identificationNumber).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.surname != null).Select(x => x.surname).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            var perc = (totalCompletenessTally / totalCompleteness) * 100;
            return perc;
        }

        public decimal GetOrganizationCompleteness(int organizationID)
        {
            var information =  this.repository.GetOrganizationInformation(organizationID);
            decimal totalCompleteness = 11;
            decimal totalCompletenessTally = 0;

            var check = information.Where(y => y.name != null).Select(x => x.name).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.accountName != null).Select(x => x.accountName).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.accountNumber != null).Select(x => x.accountNumber).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.addressLine1 != null).Select(x => x.addressLine1).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.branchCode != null).Select(x => x.branchCode).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.branchName != null).Select(x => x.branchName).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.communicationLine1 != null).Select(x => x.communicationLine1).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.registrationNumber != null).Select(x => x.registrationNumber).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.taxNumber != null).Select(x => x.taxNumber).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.tradingName != null).Select(x => x.tradingName).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            check = information.Where(y => y.vatNumber != null).Select(x => x.vatNumber).FirstOrDefault();
            if (!string.IsNullOrEmpty(check))
            {
                totalCompletenessTally++;
            }

            return (totalCompletenessTally / totalCompleteness) * 100;

        }

    }
}
