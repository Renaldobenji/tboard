using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.Data.Interfaces
{
    public interface IRepository<TEntity>
    {
        IEnumerable<TEntity> List();
        IEnumerable<TEntity> List(Expression<Func<TEntity, bool>> predicate);
        void Insert(TEntity entity);
        void Delete(TEntity entity);
        void Update(TEntity entity);
        void Save();
    }
}
