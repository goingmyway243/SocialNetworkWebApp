using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Commands.Handlers
{
    public class DeleteMessageCommandHandler : IRequestHandler<DeleteMessageCommand, Guid>
    {
        private readonly IRepository<MessageEntity> _repository;

        public DeleteMessageCommandHandler(IRepository<MessageEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(DeleteMessageCommand request, CancellationToken cancellationToken)
        {
            var messageToDelete = await _repository.GetById(request.Id);

            if (messageToDelete == null)
            {
                return default;
            }

            return await _repository.Delete(messageToDelete);
        }
    }
}
