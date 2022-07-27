using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Queries
{
    public class GetAllContentsQuery : IRequest<IEnumerable<ContentEntity>>
    {
    }
}
