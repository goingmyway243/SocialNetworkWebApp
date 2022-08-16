using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetAllCommentsByPostIdRequestHandler : IRequestHandler<GetAllCommentsByPostIdRequest, IEnumerable<CommentEntity>>
    {
        private readonly IRepository<CommentEntity> _repository;

        public GetAllCommentsByPostIdRequestHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<CommentEntity>> Handle(GetAllCommentsByPostIdRequest request, CancellationToken cancellationToken)
        {
            var listComments = await _repository.GetAll();
            return listComments.Where(comment => comment.PostId == request.PostId);
        }
    }
}
