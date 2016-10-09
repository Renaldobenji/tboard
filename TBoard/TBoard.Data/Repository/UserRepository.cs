using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class UserRepository: Repository<user>
    {
        public UserRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }

        public IList<role> GetRolesForUser(int userID)
        {
            return this._dbContext.sps_GetRolesForUser(userID).ToList();
        }

        public void AddUserToGroup(int userID, string groupCode)
        {
            groupmembership mem = new groupmembership();
            mem.fromDate = DateTime.Now;
            mem.groupCode = groupCode;
            mem.userID = userID;

            this._dbContext.groupmemberships.Add(mem);
            this._dbContext.SaveChanges();
        }

        public IList<sps_GetAllUserInformation_Result> GetUserInformation(int userID)
        {
            return this._dbContext.sps_GetAllUserInformation(userID).ToList();
        }

        public IList<sps_GetAllOrganizationInformation_Result> GetOrganizationInformation(int organizationID)
        {
            return this._dbContext.sps_GetAllOrganizationInformation(organizationID).ToList();
        }
    }
}
