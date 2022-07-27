using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Commands
{
    public class CreateReactCommand : IRequest<Guid>
    {
        public ReactEntity.ReactType Type { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
