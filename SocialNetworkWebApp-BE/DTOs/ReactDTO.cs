using SocialNetworkWebApp.DTOs.Base;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class ReactDTO:BaseDTO<Guid>
    {
        public ReactEntity.ReactType Type { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
