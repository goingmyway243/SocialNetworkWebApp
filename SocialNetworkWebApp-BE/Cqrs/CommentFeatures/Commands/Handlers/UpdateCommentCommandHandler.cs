using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Commands.Handlers
{
    public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand, Guid>
    {
        private readonly IRepository<CommentEntity> _repository;

        public UpdateCommentCommandHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
        {
            var commentToUpdate = await _repository.GetById(request.Id);

            if (commentToUpdate == null)
            {
                return default;
            }

            commentToUpdate.Comment = request.Comment;
            commentToUpdate.UpdatedTime = DateTime.Now;

            return await _repository.Update(commentToUpdate);
        }
    }
}
