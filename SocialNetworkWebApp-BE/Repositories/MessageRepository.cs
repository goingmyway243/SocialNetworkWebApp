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
    public class MessageRepository : IRepository<MessageEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public MessageRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(MessageEntity entity)
        {
            _dbContext.Messages.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(MessageEntity entity)
        {
            _dbContext.Messages.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<MessageEntity>> GetAll()
        {
            return await _dbContext.Messages.ToListAsync();
        }

        public async Task<MessageEntity> GetById(Guid id)
        {
            return await _dbContext.Messages.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(MessageEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
