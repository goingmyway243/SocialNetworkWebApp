using SocialNetworkWebApp.DTOs.Base;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class ChatroomDTO:BaseDTO<Guid>
    {
        public string ChatroomName { get; set; }
    }
}
