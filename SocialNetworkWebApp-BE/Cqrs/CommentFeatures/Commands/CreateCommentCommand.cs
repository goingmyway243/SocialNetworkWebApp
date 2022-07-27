using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Commands
{
    public class CreateCommentCommand : IRequest<Guid>
    {
        public string Comment { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
