using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Context;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetAllChatroomsByUserRequestIdHandler : IRequestHandler<GetAllChatroomsByUserIdRequest, IEnumerable<ChatroomEntity>>
    {
        private readonly SocialNetworkContext _dbContext;

        public GetAllChatroomsByUserRequestIdHandler(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ChatroomEntity>> Handle(GetAllChatroomsByUserIdRequest request, CancellationToken cancellationToken)
        {
            var requestUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == request.UserId);

            return await _dbContext.Chatrooms
                .Include(chatroom => chatroom.ChatMembers)
                .AsSplitQuery()
                .Where(chatroom => chatroom.ChatMembers.Contains(requestUser))
                .ToListAsync();
        }
    }
}
