using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetRelationshipBetweenUsersRequestHandler : IRequestHandler<GetRelationshipBetweenUsersRequest, FriendshipEntity>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public GetRelationshipBetweenUsersRequestHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<FriendshipEntity> Handle(GetRelationshipBetweenUsersRequest request, CancellationToken cancellationToken)
        {
            var listFriendships = await _repository.GetAll();
            return listFriendships
                .FirstOrDefault(friendship =>
            (friendship.UserId == request.UserId && friendship.FriendId == request.FriendId) ||
            (friendship.UserId == request.FriendId && friendship.FriendId == request.UserId));
        }
    }
}
