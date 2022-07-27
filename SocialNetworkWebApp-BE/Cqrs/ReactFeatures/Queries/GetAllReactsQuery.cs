using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Queries
{
    public class GetAllReactsQuery : IRequest<IEnumerable<ReactEntity>>
    {
    }
}
