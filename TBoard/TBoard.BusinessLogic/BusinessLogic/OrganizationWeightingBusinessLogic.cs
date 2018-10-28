using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class OrganizationWeightingBusinessLogic : BusinessLogic<organizationweighting>
    {
        private OrganizationWeightingRepository repository;

        public OrganizationWeightingBusinessLogic(IUnitOfWork unitOfWork, OrganizationWeightingRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public void SaveWeighting(string propertyName, decimal propertyValue,int organizationID)
        {
            var existingWeightingInfo = repository.List(x => x.organizationID == organizationID).FirstOrDefault();

            if (existingWeightingInfo == null)
                 createWeighting(propertyName, propertyValue, organizationID);
            else
                 updateWeighting(existingWeightingInfo, propertyName, propertyValue);
        }

        private void createWeighting(string propertyName, decimal propertyValue, int organizationID)
        {
            organizationweighting orgWeighting = new organizationweighting();
            orgWeighting.organizationID = organizationID;

            orgWeighting = setPropertyValue(propertyName, propertyValue, orgWeighting);

            this.Create(orgWeighting);
        }

        private void updateWeighting(organizationweighting orgWeighting, string propertyName, decimal propertyValue)
        {
            orgWeighting = setPropertyValue(propertyName, propertyValue, orgWeighting);

            this.Update(orgWeighting);
        }

        private organizationweighting setPropertyValue(string propertyName, decimal propertyValue, organizationweighting organizationweightingInstance)
        {
            var property = organizationweightingInstance.GetType().GetProperty(propertyName, BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.DeclaredOnly);

            if (property != null)
            {
                property.SetValue(organizationweightingInstance, propertyValue, null);
                organizationweightingInstance.totalWeighting = sumWeightings(organizationweightingInstance);
            }

            return organizationweightingInstance;
        }

        private decimal sumWeightings(organizationweighting organizationweightingInstance)
        {
            decimal totalWeighting = 0;

            PropertyInfo[] properties = organizationweightingInstance.GetType().GetProperties();

            foreach (PropertyInfo pi in properties)
            {
                if(!pi.Name.ToLower().Equals("organizationweightingid") && !pi.Name.ToLower().Equals("totalweighting"))
                {
                    if(pi.PropertyType==typeof(decimal?)&&pi.GetValue(organizationweightingInstance) !=null)
                    {
                        totalWeighting+= (decimal)pi.GetValue(organizationweightingInstance);
                    }
                }
            }

            return totalWeighting;
        }
    }
}
