using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Queries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserEntity>>
    {
    }
}
