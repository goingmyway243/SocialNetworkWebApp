using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetAllReactsByPostIdRequestHandler : IRequestHandler<GetAllReactsByPostIdRequest, IEnumerable<ReactEntity>>
    {
        private readonly IRepository<ReactEntity> _repository;

        public GetAllReactsByPostIdRequestHandler(IRepository<ReactEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ReactEntity>> Handle(GetAllReactsByPostIdRequest request, CancellationToken cancellationToken)
        {
            var listReacts = await _repository.GetAll();
            return listReacts.Where(react => react.PostId == request.PostId);
        }
    }
}
