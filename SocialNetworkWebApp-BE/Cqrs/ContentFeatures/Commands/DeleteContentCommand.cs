using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Commands
{
    public class DeleteContentCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
