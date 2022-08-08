using AutoMapper;
using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class CreatePostWithContentRequestHandler : IRequestHandler<CreatePostWithContentRequest, Guid>
    {
        private readonly IRepository<PostEntity> _postRepo;
        private readonly IMapper _autoMapper;

        public CreatePostWithContentRequestHandler(
            IRepository<PostEntity> postRepo,
            IMapper autoMapper)
        {
            _postRepo = postRepo;
            _autoMapper = autoMapper;
        }

        public async Task<Guid> Handle(CreatePostWithContentRequest request, CancellationToken cancellationToken)
        {
            var newPost = _autoMapper.Map<PostEntity>(request.post);
            newPost.Contents = request.contents.Select(dto => _autoMapper.Map<ContentEntity>(dto)).ToList();
            await _postRepo.Create(newPost);

            return newPost.Id;
        }
    }
}
