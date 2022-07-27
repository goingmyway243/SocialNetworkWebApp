using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Context;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Repositories
{
    public class ReactRepository:IRepository<ReactEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public ReactRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(ReactEntity entity)
        {
            _dbContext.Reacts.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(ReactEntity entity)
        {
            _dbContext.Reacts.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<ReactEntity>> GetAll()
        {
            return await _dbContext.Reacts.ToListAsync();
        }

        public async Task<ReactEntity> GetById(Guid id)
        {
            return await _dbContext.Reacts.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(ReactEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
