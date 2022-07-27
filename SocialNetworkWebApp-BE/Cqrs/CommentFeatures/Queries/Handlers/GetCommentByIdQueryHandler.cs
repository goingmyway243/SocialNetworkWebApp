using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Queries.Handlers
{
    public class GetCommentByIdQueryHandler : IRequestHandler<GetCommentByIdQuery, CommentEntity>
    {
        private readonly IRepository<CommentEntity> _repository;

        public GetCommentByIdQueryHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<CommentEntity> Handle(GetCommentByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
