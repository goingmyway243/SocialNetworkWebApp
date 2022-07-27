using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Commands
{
    public class DeleteMessageCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
