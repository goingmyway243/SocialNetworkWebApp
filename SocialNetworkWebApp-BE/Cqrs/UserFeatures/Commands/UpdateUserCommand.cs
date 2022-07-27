using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Commands
{
    public class UpdateUserCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public UserEntity.RoleType Role { get; set; }
    }
}
