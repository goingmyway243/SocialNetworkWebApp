using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Queries.Handlers
{
    public class GetAllFriendshipsQueryHandler : IRequestHandler<GetAllFriendshipsQuery, IEnumerable<FriendshipEntity>>
    {
        private readonly IRepository<FriendshipEntity> _repository;

        public GetAllFriendshipsQueryHandler(IRepository<FriendshipEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FriendshipEntity>> Handle(GetAllFriendshipsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
