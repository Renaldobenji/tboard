using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;

namespace TBoard.Data.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class 
    {
        public readonly TBoardEntitiesSQL _dbContext;

        public Repository(TBoardEntitiesSQL dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual IEnumerable<TEntity> List()
        {
            return _dbContext.Set<TEntity>().AsEnumerable();
        }

        public virtual IEnumerable<TEntity> List(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>()
                   .Where(predicate)
                   .AsEnumerable();
        }

        public void Insert(TEntity entity)
        {
            _dbContext.Set<TEntity>().Add(entity);
        }

        public void Update(TEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(TEntity entity)
        {
            _dbContext.Set<TEntity>().Remove(entity);
        }
        
        public IEnumerable<TEntity> ExecWithStoreProcedure(string query, params object[] parameters)
        {
            return _dbContext.Database.SqlQuery<TEntity>(query, parameters);
        }

        public IEnumerable<TNewEntity> ExecWithStoreProcedure<TNewEntity>(string query, params object[] parameters)
        {
            return _dbContext.Database.SqlQuery<TNewEntity>(query, parameters);
        }

        public void Save()
        {
            try
            {
                // Your code...
                // Could also be before try if you know the exception occurs in SaveChanges

                _dbContext.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
           
        }
    }
}
