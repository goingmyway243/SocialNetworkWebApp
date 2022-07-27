using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Queries
{
    public class GetAllPostsQuery : IRequest<IEnumerable<PostEntity>>
    {
    }
}
