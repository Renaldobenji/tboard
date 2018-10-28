using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class ConfigRepository : Repository<config>
    {
        public ConfigRepository(TBoardEntitiesSQL dbContext)
            :base(dbContext)
        {
            
        }

        public string GetConfigValue(string name)
        {
            return this._dbContext.configs.Where(x => x.name == name).FirstOrDefault().value;
        }
    }
}
