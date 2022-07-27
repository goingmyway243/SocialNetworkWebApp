using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Commands
{
    public class DeleteFriendshipCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
