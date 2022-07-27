using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Commands
{
    public class CreateFriendshipCommand : IRequest<Guid>
    {
        public Guid UserId { get; set; }
        public Guid FriendId { get; set; }
        public FriendshipEntity.FriendStatus Status { get; set; }
    }
}
