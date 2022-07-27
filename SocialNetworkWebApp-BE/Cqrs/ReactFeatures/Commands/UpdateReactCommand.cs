using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Commands
{
    public class UpdateReactCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public ReactEntity.ReactType Type { get; set; }
    }
}
