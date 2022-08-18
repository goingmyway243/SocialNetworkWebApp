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
    public class GetAllCommentsByPostIdRequestHandler : IRequestHandler<GetAllCommentsByPostIdRequest, IEnumerable<CommentEntity>>
    {
        private readonly SocialNetworkContext _dbContext;

        public GetAllCommentsByPostIdRequestHandler(SocialNetworkContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<IEnumerable<CommentEntity>> Handle(GetAllCommentsByPostIdRequest request, CancellationToken cancellationToken)
        {
            var commentsOfEachPage = 10;
            return await _dbContext.Comments
                .Where(comment => comment.PostId == request.PostId)
                .OrderByDescending(comment => comment.CreatedTime)
                .Skip(commentsOfEachPage * request.Paging)
                .Take(commentsOfEachPage)
                .Include(comment => comment.User)
                .OrderBy(comment => comment.CreatedTime)
                .ToListAsync();
        }
    }
}
