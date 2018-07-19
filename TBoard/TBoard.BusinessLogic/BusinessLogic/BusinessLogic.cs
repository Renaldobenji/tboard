using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TBoard.BusinessLogic.Interfaces;
using TBoard.Data.Interfaces;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public abstract class BusinessLogic<TEntity> : IEntityBusinessLogic<TEntity> where TEntity : class
    {
        private IUnitOfWork unitOfWork;
        private IRepository<TEntity> repository;

        public BusinessLogic(IUnitOfWork unitOfWork, IRepository<TEntity> repository)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
        }

        public void Create(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            repository.Insert(entity);
            unitOfWork.Commit();
        }

        public IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {
            return repository.List(predicate);
        }

        public void Delete(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            repository.Delete(entity);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return repository.List();
        }

        public virtual void Update(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            repository.Update(entity);
            //unitOfWork.Commit();
        }
    }
}
