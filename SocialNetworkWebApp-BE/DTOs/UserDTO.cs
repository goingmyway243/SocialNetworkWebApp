using SocialNetworkWebApp.DTOs.Base;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class UserDTO : BaseDTO<Guid>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public UserEntity.RoleType Role { get; set; }
    }
}
