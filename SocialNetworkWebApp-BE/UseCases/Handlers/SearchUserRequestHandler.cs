using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class SearchUserRequestHandler : IRequestHandler<SearchUserRequest, IEnumerable<UserEntity>>
    {
        private readonly IRepository<UserEntity> _repository;

        public SearchUserRequestHandler(IRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UserEntity>> Handle(SearchUserRequest request, CancellationToken cancellationToken)
        {
            var listUsers = await _repository.GetAll();
            var keyword = request.Keyword != null ? request.Keyword.ToLower() : "";
            return listUsers.Where(user =>
            user.GetFullName().ToLower().Contains(keyword)
            && user.Id != request.UserId);
        }
    }
}
