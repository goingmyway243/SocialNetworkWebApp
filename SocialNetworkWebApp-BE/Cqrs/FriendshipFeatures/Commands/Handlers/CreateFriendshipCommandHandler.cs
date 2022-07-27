using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Commands.Handlers
{
    public class CreateFriendshipCommandHandler : IRequestHandler<CreateFriendshipCommand, Guid>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public CreateFriendshipCommandHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateFriendshipCommand request, CancellationToken cancellationToken)
        {
            var newFriendship = new FriendshipEntity();
            newFriendship.UserId = request.UserId;
            newFriendship.FriendId = request.FriendId;
            newFriendship.Status = request.Status;

            newFriendship.CreatedTime = DateTime.Now;
            newFriendship.UpdatedTime = DateTime.Now;

            return await _repository.Create(newFriendship);
        }
    }
}
