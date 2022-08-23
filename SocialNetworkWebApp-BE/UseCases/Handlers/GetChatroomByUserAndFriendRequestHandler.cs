using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Context;
using SocialNetworkWebApp.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetChatroomByUserAndFriendRequestHandler : IRequestHandler<GetChatroomByUserAndFriendRequest, ChatroomEntity>
    {
        private readonly SocialNetworkContext _dbContext;
        private readonly IMapper _mapper;

        public GetChatroomByUserAndFriendRequestHandler(SocialNetworkContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ChatroomEntity> Handle(GetChatroomByUserAndFriendRequest request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<UserEntity>(request.User);
            var friend = _mapper.Map<UserEntity>(request.Friend);

            return await _dbContext.Chatrooms
                .Include(chatroom => chatroom.ChatMembers)
                .AsSplitQuery()
                .FirstOrDefaultAsync(chatroom => chatroom.ChatMembers.Contains(user) && chatroom.ChatMembers.Contains(friend));
        }
    }
}
