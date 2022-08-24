using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkWebApp.UseCases;
using System.Threading.Tasks;
using System;
using MediatR;

namespace SocialNetworkWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChattingController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ChattingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllChatroomsByUserId(Guid userId)
        {
            return Ok(await _mediator.Send(new GetAllChatroomsByUserIdRequest { UserId = userId }));
        }

        [HttpPost]
        public async Task<IActionResult> GetChatroomByUserAndFriend(GetChatroomByUserAndFriendRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPost("{chatroomId}")]
        public async Task<IActionResult> GetMessageByChatroomId(GetAllMessagesByChatroomIdRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
