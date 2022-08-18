using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetAllRelationshipByUserIdRequestHandler : IRequestHandler<GetAllRelationshipByUserIdRequest, IEnumerable<FriendshipEntity>>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public GetAllRelationshipByUserIdRequestHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FriendshipEntity>> Handle(GetAllRelationshipByUserIdRequest request, CancellationToken cancellationToken)
        {
            var listFriendships = await _repository.GetAll();
            return listFriendships.Where(friendship =>
            (friendship.UserId == request.UserId || friendship.FriendId == request.UserId) &&
            friendship.Status != FriendshipEntity.FriendStatus.Request);
        }
    }
}
