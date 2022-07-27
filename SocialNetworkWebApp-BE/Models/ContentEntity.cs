using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class ContentEntity : BaseEntity<Guid>
    {
        public enum ContentType
        {
            Text, Image, Video
        }

        public string TextContent { get; set; }
        public string LinkContent { get; set; }
        public ContentType Type { get; set; }
        public Guid PostId { get; set; }

        public PostEntity Post { get; set; }
    }
}
