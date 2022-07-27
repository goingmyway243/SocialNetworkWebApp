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
    public class UserRepository : IRepository<UserEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public UserRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(UserEntity entity)
        {
            _dbContext.Users.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(UserEntity entity)
        {
            _dbContext.Users.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<UserEntity>> GetAll()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<UserEntity> GetById(Guid id)
        {
            return await _dbContext.Users.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(UserEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
