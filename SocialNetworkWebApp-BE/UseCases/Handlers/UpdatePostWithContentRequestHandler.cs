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
    public class UpdatePostWithContentRequestHandler : IRequestHandler<UpdatePostWithContentRequest, Guid>
    {
        private readonly IRepository<PostEntity> _postRepo;
        private readonly IMapper _autoMapper;

        public UpdatePostWithContentRequestHandler(
            IRepository<PostEntity> postRepo,
            IMapper autoMapper)
        {
            _postRepo = postRepo;
            _autoMapper = autoMapper;
        }

        public async Task<Guid> Handle(UpdatePostWithContentRequest request, CancellationToken cancellationToken)
        {
            var postToUpdate = _autoMapper.Map<PostEntity>(request.post);
            postToUpdate.Contents = request.contents.Select(dto => _autoMapper.Map<ContentEntity>(dto)).ToList();
            await _postRepo.Update(postToUpdate);

            return postToUpdate.Id;
        }
    }
}
