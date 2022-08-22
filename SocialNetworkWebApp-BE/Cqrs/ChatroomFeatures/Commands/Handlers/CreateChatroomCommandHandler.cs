using AutoMapper;
using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands.Handlers
{
    public class CreateChatroomCommandHandler : IRequestHandler<CreateChatroomCommand, Guid>
    {
        private readonly IRepository<ChatroomEntity> _repository;
        private readonly IMapper _mapper;

        public CreateChatroomCommandHandler(IRepository<ChatroomEntity> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Guid> Handle(CreateChatroomCommand request, CancellationToken cancellationToken)
        {
            var chatMembers = request.ChatMembers
                .Select(member => _mapper.Map<UserEntity>(member))
                .ToList();
            var newChatroom = new ChatroomEntity();

            newChatroom.ChatroomName = request.ChatroomName;
            newChatroom.ChatMembers = chatMembers;

            newChatroom.CreatedTime = DateTime.Now;
            newChatroom.UpdatedTime = DateTime.Now;

            return await _repository.Create(newChatroom);
        }
    }
}
