using SocialNetworkWebApp.DTOs.Base;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class ContentDTO:BaseDTO<Guid>
    {
        public string TextContent { get; set; }
        public string LinkContent { get; set; }
        public ContentEntity.ContentType Type { get; set; }
        public Guid PostId { get; set; }
    }
}
