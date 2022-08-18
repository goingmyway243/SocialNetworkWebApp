using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllFriendRequestByUserIdRequest:IRequest<IEnumerable<FriendshipEntity>>
    {
        public Guid UserId { get; set; }
    }
}
