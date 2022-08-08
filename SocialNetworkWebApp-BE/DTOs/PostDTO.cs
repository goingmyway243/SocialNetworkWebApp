using SocialNetworkWebApp.DTOs.Base;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class PostDTO : BaseDTO<Guid>
    {
        public string Caption { get; set; }
        public Guid UserId { get; set; }
        public Guid? SharePostId { get; set; }
    }
}
