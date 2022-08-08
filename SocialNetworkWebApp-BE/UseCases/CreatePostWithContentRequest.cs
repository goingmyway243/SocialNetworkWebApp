using MediatR;
using Microsoft.AspNetCore.Http;
using SocialNetworkWebApp.DTOs;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class CreatePostWithContentRequest:IRequest<Guid>
    {
        public PostDTO post{ get; set; }
        public List<ContentDTO> contents { get; set; }
    }
}
