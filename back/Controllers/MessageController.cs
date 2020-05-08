using chat.Models;
using chat.Services;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace chat.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase {
        private readonly MessageService _messageService;

        public MessageController(MessageService messageService) {
            _messageService = messageService;
        }

        [HttpGet]
        public List<Message> GetAll() =>
            _messageService.GetAll();

        [HttpDelete]
        public void DeleteAll() =>
            _messageService.DeleteAll();

        [HttpGet("{name}")]
        public ActionResult<List<Message>> GetMessage(string name) =>
            _messageService.GetMessage(name);

        [HttpPost]
        public IActionResult SendMessage(Message message) {
            string msg = _messageService.SendMessage(message);
            if (msg == "Ok") {
                return Ok();
            }
            return BadRequest(msg);
        }
    }
}