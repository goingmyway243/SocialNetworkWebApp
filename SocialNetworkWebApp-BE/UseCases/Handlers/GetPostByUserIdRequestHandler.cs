using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Context;
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
        private readonly SocialNetworkContext _dbContext;

        public GetAllPostsByUserIdRequestHandler(
            SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<PostEntity>> Handle(GetAllPostsByUserIdRequest request, CancellationToken cancellationToken)
        {
            var listPost = await _dbContext.Posts
                .Where(post => post.UserId == request.UserId)
                .Include(post => post.Contents)
                .ToListAsync();

            return listPost.OrderByDescending(post => post.CreatedTime);
        }
    }
}
