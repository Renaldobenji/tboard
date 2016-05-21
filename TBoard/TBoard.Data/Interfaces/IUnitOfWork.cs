using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Interfaces
{
    public interface IUnitOfWork
    {
        int Commit();
    }
}
