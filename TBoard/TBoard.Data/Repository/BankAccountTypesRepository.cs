﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class BankAccountTypesRepository : Repository<bankaccounttype>
    {
        public BankAccountTypesRepository(TBoardEntitiesSQL dbContext)
            :base(dbContext)
        {
            
        }
    }
}
