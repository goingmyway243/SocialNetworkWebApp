using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllChatroomsByUserIdRequest:IRequest<IEnumerable<ChatroomEntity>>
    {
        public Guid UserId { get; set; }
    }
}
