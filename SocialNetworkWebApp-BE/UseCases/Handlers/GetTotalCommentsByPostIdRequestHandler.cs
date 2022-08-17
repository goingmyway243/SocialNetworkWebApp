using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetTotalCommentsByPostIdRequestHandler : IRequestHandler<GetTotalCommentsByPostIdRequest, int>
    {
        private readonly IRepository<CommentEntity> _repository;

        public GetTotalCommentsByPostIdRequestHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(GetTotalCommentsByPostIdRequest request, CancellationToken cancellationToken)
        {
            var listComments = await _repository.GetAll();
            return listComments
                .Where(comment => comment.PostId == request.PostId)
                .ToList()
                .Count;
        }
    }
}
