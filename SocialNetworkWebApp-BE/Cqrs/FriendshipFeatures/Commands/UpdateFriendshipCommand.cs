using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.FriendshipFeatures.Commands
{
    public class UpdateFriendshipCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public FriendshipEntity.FriendStatus Status { get; set; }
    }
}
