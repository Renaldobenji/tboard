using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.BusinessLogic.Interfaces
{
    public interface IEntityBusinessLogic<TEntity>
    {
        void Create(TEntity entity);
        void Delete(TEntity entity);
        IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        IEnumerable<TEntity> GetAll();
        void Update(TEntity entity);
    }
}
