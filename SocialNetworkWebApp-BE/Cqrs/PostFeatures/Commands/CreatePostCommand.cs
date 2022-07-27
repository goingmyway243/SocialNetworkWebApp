using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Commands
{
    public class CreatePostCommand : IRequest<Guid>
    {
        public string Caption { get; set; }
        public Guid UserId { get; set; }
        public Guid? SharePostId { get; set; }
    }
}
