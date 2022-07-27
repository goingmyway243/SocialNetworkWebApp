using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Queries.Handlers
{
    public class GetFriendshipByIdQueryHandler : IRequestHandler<GetFriendshipByIdQuery, FriendshipEntity>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public GetFriendshipByIdQueryHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<FriendshipEntity> Handle(GetFriendshipByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
