using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Commands.Handlers
{
    public class DeleteFriendshipCommandHandler : IRequestHandler<DeleteFriendshipCommand, Guid>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public DeleteFriendshipCommandHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(DeleteFriendshipCommand request, CancellationToken cancellationToken)
        {
            var friendshipToDelete = await _repository.GetById(request.Id);

            if (friendshipToDelete == null)
            {
                return default;
            }

            return await _repository.Delete(friendshipToDelete);
        }
    }
}
