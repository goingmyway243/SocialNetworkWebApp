using SocialNetworkWebApp.DTOs.Base;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class MessageDTO:BaseDTO<Guid>
    {
        public string Message { get; set; }
        public Guid UserId { get; set; }
        public Guid ChatroomId { get; set; }
    }
}
