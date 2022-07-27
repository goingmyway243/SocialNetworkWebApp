using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Queries.Handlers
{
    public class GetReactByIdQueryHandler : IRequestHandler<GetReactByIdQuery, ReactEntity>
    {
        private readonly IRepository<ReactEntity> _repository;

        public GetReactByIdQueryHandler(IRepository<ReactEntity> repository)
        {
            _repository = repository;
        }

        public async Task<ReactEntity> Handle(GetReactByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
