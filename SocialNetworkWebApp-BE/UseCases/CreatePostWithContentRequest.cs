using MediatR;
using Microsoft.AspNetCore.Http;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class CreatePostWithContentRequest:IRequest<Guid>
    {
        public string Caption { get; set; }
        public Guid UserId { get; set; }
        public Guid? SharePostId { get; set; }
        public List<ContentEntity> Contents { get; set; }
    }
}
