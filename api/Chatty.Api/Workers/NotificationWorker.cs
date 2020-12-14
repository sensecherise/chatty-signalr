using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Chatty.Api.Controllers;
using Chatty.Api.Models;
using Chatty.Api.Hubs;
using Chatty.Api.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace Chatty.Api.Workers
{
    public class NotificationWorker : BackgroundService
    {
        private readonly ILogger<NotificationWorker> _logger;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public NotificationWorker(ILogger<NotificationWorker> logger, IHubContext<ChatHub, IChatClient> chatHub)
        {
            _logger = logger;
            _chatHub = chatHub;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                ChatMessage chatMsg = new ChatMessage();
                chatMsg.User = "System";
                chatMsg.Message = "Worker running";

                ChatController chat = new ChatController(_chatHub);

                chat.SendNotification(chatMsg);

                await Task.Delay(2000, stoppingToken);
            }
        }
    }
}
