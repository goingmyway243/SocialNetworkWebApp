using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace SocialNetworkWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("{folderName}")]
        public IActionResult UploadImages(string folderName)
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                if (files != null && files.Count > 0)
                {
                    foreach (var file in files)
                    {
                        var fileName = Path.GetFileName(file.FileName);
                        var path = Path.Combine("", _hostingEnvironment.ContentRootPath + "/Images/" + folderName + "/" + fileName);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    return Ok("Saved Successfully");
                }
                else
                {
                    return BadRequest("No file to save!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
