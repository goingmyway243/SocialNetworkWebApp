using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Commands
{
    public class CreateContentCommand : IRequest<Guid>
    {
        public string TextContent { get; set; }
        public string LinkContent { get; set; }
        public ContentEntity.ContentType Type { get; set; }
        public Guid PostId { get; set; }
    }
}
