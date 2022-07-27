using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Commands.Handlers
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Guid>
    {
        private readonly IRepository<CommentEntity> _repository;

        public CreateCommentCommandHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var newComment = new CommentEntity();
            newComment.Comment = request.Comment;
            newComment.PostId = request.PostId;
            newComment.UserId = request.UserId;

            newComment.CreatedTime = DateTime.Now;
            newComment.UpdatedTime = DateTime.Now;

            return await _repository.Create(newComment);
        }
    }
}
