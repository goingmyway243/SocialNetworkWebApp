using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Commands
{
    public class UpdateCommentCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string Comment { get; set; }
    }
}
