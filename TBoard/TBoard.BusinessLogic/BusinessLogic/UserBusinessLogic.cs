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

        public UserBusinessLogic(IUnitOfWork unitOfWork, UserRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
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
            newUser.isApproved = true;
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

        public UserResponse CreateUser(string userName, string name, string surname, string password, string title, string idNumber, int organizationId)
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
            newUser.isApproved = true;
            newUser.lastActivityDate = DateTime.Now;
            newUser.lastPasswordChange = DateTime.Now;
            newUser.isLockedOut = "false";
            newUser.failedPasswordAttemptCount = 0;
            newUser.lastLoginDate = DateTime.Now;
            newUser.organizationID = organizationId;
            newUser.created = DateTime.Now;

            this.Create(newUser);

            response.UserID = newUser.userID;

            return response;
        }

        public IList<role> GetRolesForUser(int userID)
        {
            return this.repository.GetRolesForUser(userID);
        }

    }
}
