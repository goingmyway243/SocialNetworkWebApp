using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Queries.Handlers
{
    public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, IEnumerable<PostEntity>>
    {
        private readonly IRepository<PostEntity> _repository;

        public GetAllPostsQueryHandler(IRepository<PostEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PostEntity>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
