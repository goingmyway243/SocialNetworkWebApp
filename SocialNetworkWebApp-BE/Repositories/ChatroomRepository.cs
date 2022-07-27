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
    public class ChatroomRepository : IRepository<ChatroomEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public ChatroomRepository(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Create(ChatroomEntity entity)
        {
            _dbContext.Chatrooms.Add(entity);
            await Save();
            return entity.Id;
        }

        public async Task<Guid> Delete(ChatroomEntity entity)
        {
            _dbContext.Chatrooms.Remove(entity);
            await Save();
            return entity.Id;
        }

        public async Task<IEnumerable<ChatroomEntity>> GetAll()
        {
            return await _dbContext.Chatrooms.ToListAsync();
        }

        public async Task<ChatroomEntity> GetById(Guid id)
        {
            return await _dbContext.Chatrooms.FindAsync(id);
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> Update(ChatroomEntity entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await Save();
            return entity.Id;
        }
    }
}
