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
    public class PostRepository : IRepository<PostEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public PostRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(PostEntity entity)
        {
            _dbContext.Posts.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(PostEntity entity)
        {
            _dbContext.Posts.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<PostEntity>> GetAll()
        {
            return await _dbContext.Posts.ToListAsync();
        }

        public async Task<PostEntity> GetById(Guid id)
        {
            return await _dbContext.Posts.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(PostEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
