using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands.Handlers
{
    public class CreateChatroomCommandHandler : IRequestHandler<CreateChatroomCommand, Guid>
    {
        private readonly IRepository<ChatroomEntity> _repository;

        public CreateChatroomCommandHandler(IRepository<ChatroomEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateChatroomCommand request, CancellationToken cancellationToken)
        {
            var newChatroom = new ChatroomEntity();
            newChatroom.ChatroomName = request.ChatroomName;

            newChatroom.CreatedTime = DateTime.Now;
            newChatroom.UpdatedTime = DateTime.Now;

            return await _repository.Create(newChatroom);
        }
    }
}
