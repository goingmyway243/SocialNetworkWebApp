using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Commands
{
    public class DeleteCommentCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
