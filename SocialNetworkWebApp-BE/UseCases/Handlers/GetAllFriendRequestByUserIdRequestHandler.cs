using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetAllFriendRequestByUserIdRequestHandler : IRequestHandler<GetAllFriendRequestByUserIdRequest, IEnumerable<FriendshipEntity>>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public GetAllFriendRequestByUserIdRequestHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FriendshipEntity>> Handle(GetAllFriendRequestByUserIdRequest request, CancellationToken cancellationToken)
        {
            var listFriendships = await _repository.GetAll();
            return listFriendships.Where(friendship =>
            friendship.FriendId == request.UserId &&
            friendship.Status == FriendshipEntity.FriendStatus.Request);
        }
    }
}
