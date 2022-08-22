using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Context;
using SocialNetworkWebApp.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetSharePostInformationRequestHandler : IRequestHandler<GetSharePostInformationRequest, PostEntity>
    {
        private readonly SocialNetworkContext _dbContext;

        public GetSharePostInformationRequestHandler(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PostEntity> Handle(GetSharePostInformationRequest request, CancellationToken cancellationToken)
        {
            var sharePost = await _dbContext.Posts
                .Where(post => post.Id == request.SharePostId)
                .Include(post => post.User)
                .Include(post => post.Contents)
                .ToListAsync();
            return sharePost[0];
        }
    }
}
