using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Queries
{
    public class GetAllFriendshipsQuery : IRequest<IEnumerable<FriendshipEntity>>
    {
    }
}
