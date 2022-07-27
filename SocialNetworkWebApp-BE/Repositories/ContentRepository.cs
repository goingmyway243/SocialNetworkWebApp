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
    public class ContentRepository : IRepository<ContentEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public ContentRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(ContentEntity entity)
        {
            _dbContext.Contents.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(ContentEntity entity)
        {
            _dbContext.Contents.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<ContentEntity>> GetAll()
        {
            return await _dbContext.Contents.ToListAsync();
        }

        public async Task<ContentEntity> GetById(Guid id)
        {
            return await _dbContext.Contents.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(ContentEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
