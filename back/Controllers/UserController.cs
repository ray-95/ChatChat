using chat.Models;
using chat.Services;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace chat.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase {
        private readonly UserService _userService;

        public UserController(UserService userService) {
            _userService = userService;
        }

        // [HttpGet]
        // public List<User> GetAll() =>
        //     _userService.GetAll();

        // [HttpDelete]
        // public void DeleteAll() =>
        //     _userService.DeleteAll();

        [HttpPost("signup")]
        public IActionResult SignUp(User user) {
            string msg = _userService.SignUp(user);
            if (msg == "Ok") {
                return Ok();
            }
            return BadRequest(msg);
        }

        [HttpPost("signin")]
        public IActionResult SignIn(User user) {
            string[] msg = _userService.SignIn(user);
            if (msg[0] == "Ok") {
                return Ok(msg[1]);
            }
            return BadRequest(msg[0]);
        }
    }
}