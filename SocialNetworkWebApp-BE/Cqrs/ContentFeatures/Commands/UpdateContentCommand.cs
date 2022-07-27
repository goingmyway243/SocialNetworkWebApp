using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Commands
{
    public class UpdateContentCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string TextContent { get; set; }
        public string LinkContent { get; set; }
    }
}
