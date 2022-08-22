using MediatR;
using SocialNetworkWebApp.DTOs;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands
{
    public class CreateChatroomCommand : IRequest<Guid>
    {
        public string ChatroomName { get; set; }
        public List<UserDTO> ChatMembers { get; set; }
    }
}
