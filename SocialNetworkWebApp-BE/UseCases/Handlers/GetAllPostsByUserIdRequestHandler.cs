using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Context;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
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
            var postsOfEachPage = 10;

            var listFriendIds = new List<Guid>();
            listFriendIds.Add(request.UserId);

            if (!request.PostedByUserOnly)
            {
                var listFriendships = await _dbContext.Friendships.ToListAsync();
                listFriendships.Where(friendship => friendship.UserId == request.UserId || friendship.FriendId == request.UserId)
                    .ToList().ForEach(friendship =>
                    {
                        var id = friendship.UserId == request.UserId ? friendship.FriendId : friendship.UserId;
                        if (friendship.Status == FriendshipEntity.FriendStatus.Friend)
                        {
                            listFriendIds.Add(id);
                        }
                    });
            }

            return await _dbContext.Posts
                .Where(post => listFriendIds.Contains(post.UserId))
                .OrderByDescending(post => post.CreatedTime)
                .Skip(postsOfEachPage * request.Paging)
                .Take(postsOfEachPage)
                .Include(post => post.Contents)
                .Include(post => post.Reacts)
                .ToListAsync();
        }
    }
}
