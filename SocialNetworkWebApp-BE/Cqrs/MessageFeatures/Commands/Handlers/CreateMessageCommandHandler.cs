using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Commands.Handlers
{
    public class CreateMessageCommandHandler : IRequestHandler<CreateMessageCommand, Guid>
    {
        private readonly IRepository<MessageEntity> _repository;

        public CreateMessageCommandHandler(IRepository<MessageEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var newMessage = new MessageEntity();
            newMessage.Message = request.Message;
            newMessage.UserId = request.UserId;
            newMessage.ChatroomId = request.ChatroomId;

            newMessage.CreatedTime = DateTime.Now;
            newMessage.UpdatedTime = DateTime.Now;

            return await _repository.Create(newMessage);
        }
    }
}
