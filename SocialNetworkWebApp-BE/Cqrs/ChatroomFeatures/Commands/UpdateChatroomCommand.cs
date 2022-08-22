using MediatR;
using SocialNetworkWebApp.DTOs;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands
{
    public class UpdateChatroomCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string ChatroomName { get; set; }
        public List<UserDTO> ChatMembers { get; set; }
    }
}
