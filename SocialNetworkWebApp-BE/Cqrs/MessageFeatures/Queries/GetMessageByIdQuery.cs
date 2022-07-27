using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Queries
{
    public class GetMessageByIdQuery : IRequest<MessageEntity>
    {
        public Guid Id { get; set; }
    }
}
