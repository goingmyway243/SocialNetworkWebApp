using SocialNetworkWebApp.DTOs.Base;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class CommentDTO : BaseDTO<Guid>
    {
        public string Comment { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
