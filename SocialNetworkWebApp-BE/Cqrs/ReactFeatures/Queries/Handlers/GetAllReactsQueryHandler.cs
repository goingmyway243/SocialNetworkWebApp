using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Queries.Handlers
{
    public class GetAllReactsQueryHandler : IRequestHandler<GetAllReactsQuery, IEnumerable<ReactEntity>>
    {
        private readonly IRepository<ReactEntity> _repository;

        public GetAllReactsQueryHandler(IRepository<ReactEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ReactEntity>> Handle(GetAllReactsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
