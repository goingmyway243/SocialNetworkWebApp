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
    public class FriendshipRepository : IRepository<FriendshipEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public FriendshipRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(FriendshipEntity entity)
        {
            _dbContext.Friendships.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(FriendshipEntity entity)
        {
            _dbContext.Friendships.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<FriendshipEntity>> GetAll()
        {
            return await _dbContext.Friendships.ToListAsync();
        }

        public async Task<FriendshipEntity> GetById(Guid id)
        {
            return await _dbContext.Friendships.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(FriendshipEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
