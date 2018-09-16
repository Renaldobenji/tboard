﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class OrganizationRepository : Repository<organization>
    {
        public OrganizationRepository(TBoardEntities dbContext)
            :base(dbContext)
        {
            
        }

        public void MapUserToOrganization(int organizationID, int userID)
        {
            this._dbContext.organizationmappings.Add(new organizationmapping()
            {
                created = DateTime.Now,
                organizationID = organizationID,
                userID = userID
            });
            this._dbContext.SaveChanges();
        }

        public List<organization> GetUserOrganiztions(int userID)
        {
            var result = (from orgMap in this._dbContext.organizationmappings
                          join org in this._dbContext.organizations on orgMap.organizationID equals org.organizationID
                          where orgMap.userID == userID
                          select org).ToList();

            return result;
        }

        public OrganizationDTO GetOrganization(int organizationID)
        {
            var org = (from x in this._dbContext.organizations
                       where x.organizationID == organizationID
                       select new OrganizationDTO()
                       {
                           organizationID = x.organizationID.ToString(),
                           name = x.name,
                           oem = x.oem,
                           registrationNumber = x.registrationNumber,
                           taxNumber = x.taxNumber,
                           tradingName = x.tradingName,
                           vatNumber = x.vatNumber,

                       }).FirstOrDefault();

            return org;
                
                //this._dbContext.organizations.Where(x => x.organizationID == organizationID).FirstOrDefault();
        }

        public IList<custodian> GetCustodianDetails(int organizationID)
        {
            return this._dbContext.custodians.Where(x => x.organizationID == organizationID).ToList();
        }

        public void SaveMetaData(int OrganizationId, string key, string value)
        {
            var orgString = OrganizationId.ToString();
            var oldmetaData = this._dbContext.metadatas.Where(x => x.ownerType == "ORG" && x.ownerTypeID == orgString && x.metaDataName == key).FirstOrDefault();            
            
            //this.repository
            var newmetaData = new metadata();
            newmetaData.ownerType = "ORG";
            newmetaData.ownerTypeID = OrganizationId.ToString();
            newmetaData.metaDataName = key;
            newmetaData.metaDataValue = value;
            newmetaData.dateCreated = DateTime.Now;

            if (oldmetaData != null)
            {
                this._dbContext.metadatas.Remove(oldmetaData);
            }
            
            this._dbContext.metadatas.Add(newmetaData);
            this._dbContext.SaveChanges();
        }

        public IList<metadata> GetMetaData(int organizationID)
        {
            return this._dbContext.metadatas.Where(x => x.ownerTypeID == organizationID.ToString()).ToList();
        }

        public void SaveCustodianDetails(custodian custodian)
        {
            this._dbContext.custodians.Add(custodian);
            this.Save();
        }

        public void UpdateCustodianDetails(custodian custodian)
        {
            this._dbContext.Entry(custodian).State = EntityState.Modified;
            this.Save();
        }
    }
}
