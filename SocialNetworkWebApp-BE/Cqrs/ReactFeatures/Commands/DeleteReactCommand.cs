using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Commands
{
    public class DeleteReactCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
