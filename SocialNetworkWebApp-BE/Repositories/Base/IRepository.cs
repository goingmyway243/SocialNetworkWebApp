using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Repositories.Base
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(Guid id);
        Task<Guid> Create(T entity);
        Task<Guid> Update(T entity);
        Task<Guid> Delete(T entity);
        Task Save();
    }
}
