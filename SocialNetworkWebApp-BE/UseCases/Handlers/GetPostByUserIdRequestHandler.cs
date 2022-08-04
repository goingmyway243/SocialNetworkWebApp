using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetAllPostsByUserIdRequestHandler : IRequestHandler<GetAllPostsByUserIdRequest, IEnumerable<PostEntity>>
    {
        private readonly IRepository<PostEntity> _postRepo;
        private readonly IRepository<ContentEntity> _contentRepo;

        public GetAllPostsByUserIdRequestHandler(
            IRepository<PostEntity> postRepo,
            IRepository<ContentEntity> contentRepo)
        {
            _postRepo = postRepo;
            _contentRepo = contentRepo;
        }

        public async Task<IEnumerable<PostEntity>> Handle(GetAllPostsByUserIdRequest request, CancellationToken cancellationToken)
        {
            var listPost = await _postRepo.GetAll();
            var listContent = await _contentRepo.GetAll();

            listPost.Where(post => post.UserId == request.UserId)
                .ToList()
                .ForEach(post =>
                {
                    post.Contents = listContent.Where(content => content.PostId == post.Id).ToList();
                });

            return listPost.OrderByDescending(post => post.CreatedTime);
        }
    }
}
