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
    public class CommentRepository : IRepository<CommentEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public CommentRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(CommentEntity entity)
        {
            _dbContext.Comments.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(CommentEntity entity)
        {
            _dbContext.Comments.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<CommentEntity>> GetAll()
        {
            return await _dbContext.Comments.ToListAsync();
        }

        public async Task<CommentEntity> GetById(Guid id)
        {
            return await _dbContext.Comments.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(CommentEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
