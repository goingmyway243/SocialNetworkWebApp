using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Commands.Handlers
{
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand, Guid>
    {
        private readonly IRepository<CommentEntity> _repository;

        public DeleteCommentCommandHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            var commentToDelete = await _repository.GetById(request.Id);

            if(commentToDelete == null)
            {
                return default;
            }

            return await _repository.Delete(commentToDelete);
        }
    }
}
