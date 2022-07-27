using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Commands.Handlers
{
    public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, Guid>
    {
        private readonly IRepository<PostEntity> _repository;

        public CreatePostCommandHandler(IRepository<PostEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            var newPost = new PostEntity();

            newPost.Caption = request.Caption;
            newPost.UserId = request.UserId;
            newPost.SharePostId = request.SharePostId;

            newPost.CreatedTime = DateTime.Now;
            newPost.UpdatedTime = DateTime.Now;

            return await _repository.Create(newPost);
        }
    }
}
