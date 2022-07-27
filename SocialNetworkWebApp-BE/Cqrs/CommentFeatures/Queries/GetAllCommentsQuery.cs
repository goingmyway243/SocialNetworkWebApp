using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Queries
{
    public class GetAllCommentsQuery : IRequest<IEnumerable<CommentEntity>>
    {
    }
}
