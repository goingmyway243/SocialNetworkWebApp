using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Queries.Handlers
{
    public class GetAllContentsQueryHandler : IRequestHandler<GetAllContentsQuery, IEnumerable<ContentEntity>>
    {
        private readonly IRepository<ContentEntity> _repository;

        public GetAllContentsQueryHandler(IRepository<ContentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ContentEntity>> Handle(GetAllContentsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
