using AutoMapper;
using SocialNetworkWebApp.DTOs;
using SocialNetworkWebApp.Models;

namespace SocialNetworkWebApp.Mapping
{
    public class ConfigProfile:Profile
    {
        public ConfigProfile()
        {
            CreateMap<ChatroomDTO, ChatroomEntity>().ReverseMap();
            CreateMap<CommentDTO, CommentEntity>().ReverseMap();
            CreateMap<ContentDTO, ContentEntity>().ReverseMap();
            CreateMap<FriendshipDTO, FriendshipEntity>().ReverseMap();
            CreateMap<MessageDTO, MessageEntity>().ReverseMap();
            CreateMap<PostDTO, PostEntity>().ReverseMap();
            CreateMap<ReactDTO, ReactEntity>().ReverseMap();
            CreateMap<UserDTO, UserEntity>().ReverseMap();
        }
    }
}
