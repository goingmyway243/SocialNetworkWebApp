using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Queries
{
    public class GetAllMessagesQuery : IRequest<IEnumerable<MessageEntity>>
    {
    }
}
