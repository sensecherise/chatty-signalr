using System.Threading.Tasks;
using Chatty.Api.Hubs;
using Chatty.Api.Hubs.Clients;
using Chatty.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Chatty.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private readonly HubCallerContext _chatConnector;


        public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;
        }

        // [HttpPost("messages")]
        // public async Task Post(ChatMessage message)
        // {
        //     // run some logic...

        //     await _chatHub.Clients.All.ReceiveMessage(message);
        // }

        [HttpPost("messages")]
        public async Task Post(ChatMessage message)
        {
            await _chatHub.Clients.Client(message.Receiver).ReceiveMessage(message);
        }


        public async Task SendNotification(ChatMessage message)
        {
            await _chatHub.Clients.All.ReceiveMessage(message);
        }

        // public async Task GetConnectionId()
        // {
        //     var connectionId = _chatConnector.ConnectionId;

        //     ChatMessage message = new ChatMessage();
        //     message.Message = connectionId;
        //     message.User = "user";
        //     var id  =  _chatHub.Clients.All.GetConnectionId();

        //     await  _chatHub.Clients.User(connectionId).ReceiveMessage(message);
        // }

    }
}