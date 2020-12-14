using System.Threading.Tasks;
using Chatty.Api.Models;
using Microsoft.AspNetCore.SignalR;
using Chatty.Api.Hubs.Clients;

namespace Chatty.Api.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            //await Clients.All.ReceiveMessage(message);
        }
    }
}