using MediatR;
using SocialNetworkWebApp.DTOs;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.UseCases
{
    public class GetChatroomByUserAndFriendRequest:IRequest<ChatroomEntity>
    {
        public UserDTO User { get; set; }
        public UserDTO Friend { get; set; }
    }
}
