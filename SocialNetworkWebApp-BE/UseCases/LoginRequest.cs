using MediatR;
using System;

namespace SocialNetworkWebApp.UseCases
{
    public class LoginRequest:IRequest<Guid>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
