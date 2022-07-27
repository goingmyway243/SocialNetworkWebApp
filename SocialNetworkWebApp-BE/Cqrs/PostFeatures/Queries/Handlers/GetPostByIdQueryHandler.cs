using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Queries.Handlers
{
    public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, PostEntity>
    {
        private readonly IRepository<PostEntity> _repository;

        public GetPostByIdQueryHandler(IRepository<PostEntity> repository)
        {
            _repository = repository;
        }

        public async Task<PostEntity> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
