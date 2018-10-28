using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Configuration;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class ConfigBusinessLogic : BusinessLogic<config>
    {
        private ConfigRepository repository;

        public ConfigBusinessLogic(IUnitOfWork unitOfWork, ConfigRepository repository)
            : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public string GetConfigValue(string name)
        {
            return this.repository.GetConfigValue(name);
        }
    }
}
