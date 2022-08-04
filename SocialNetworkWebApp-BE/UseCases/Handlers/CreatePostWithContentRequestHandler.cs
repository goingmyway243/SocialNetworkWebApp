using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class CreatePostWithContentRequestHandler : IRequestHandler<CreatePostWithContentRequest, Guid>
    {
        private readonly IRepository<PostEntity> _postRepo;
        private readonly IRepository<ContentEntity> _contentRepo;

        public CreatePostWithContentRequestHandler(
            IRepository<PostEntity> postRepo,
            IRepository<ContentEntity> contentRepo)
        {
            _postRepo = postRepo;
            _contentRepo = contentRepo;
        }

        public async Task<Guid> Handle(CreatePostWithContentRequest request, CancellationToken cancellationToken)
        {
            var newPost = new PostEntity();
            newPost.Caption = request.Caption;
            newPost.UserId = request.UserId;
            newPost.SharePostId = request.SharePostId;
            newPost.Contents = request.Contents;

            await _postRepo.Create(newPost);

            return newPost.Id;
        }
    }
}
