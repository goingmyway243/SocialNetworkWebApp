using MediatR;
using SocialNetworkWebApp.Models;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Queries
{
    public class GetAllChatroomsQuery : IRequest<IEnumerable<ChatroomEntity>>
    {
    }
}
