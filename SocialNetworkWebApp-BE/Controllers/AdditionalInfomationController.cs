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
    public class AdditionalInfomationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdditionalInfomationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetTotalComments(Guid postId)
        {
            return Ok(await _mediator.Send(new GetTotalCommentsByPostIdRequest { PostId = postId }));
        }

        [HttpPost("{sharePostId}")]
        public async Task<IActionResult> GetSharePostInformation(Guid sharePostId)
        {
            return Ok(await _mediator.Send(new GetSharePostInformationRequest { SharePostId = sharePostId }));
        }
    }
}
