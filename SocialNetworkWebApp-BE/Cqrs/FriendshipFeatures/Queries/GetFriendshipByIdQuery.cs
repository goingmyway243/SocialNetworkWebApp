using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Queries
{
    public class GetFriendshipByIdQuery : IRequest<FriendshipEntity>
    {
        public Guid Id { get; set; }
    }
}
