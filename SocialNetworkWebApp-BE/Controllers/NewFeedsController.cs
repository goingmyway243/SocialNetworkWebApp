using MediatR;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkWebApp.UseCases;
using System;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewFeedsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NewFeedsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserFeeds(Guid userId)
        {
            return Ok(await _mediator.Send(new GetAllPostsByUserIdRequest { UserId = userId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostWithContents([FromBody] CreatePostWithContentRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
