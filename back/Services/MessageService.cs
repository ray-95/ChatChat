using MongoDB.Driver;
using chat.Models;
using chat.Settings;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System;

namespace chat.Services {
    public class MessageService {
        private readonly IMongoCollection<Message> _messages;
        private readonly UserService _userService;

        public MessageService(DbSettings settings, UserService userService) {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _messages = database.GetCollection<Message>("Messages");

            _userService = userService;
        }

        public List<Message> GetAll() =>
            _messages.Find(message => true).ToList();

        public void DeleteAll() =>
            _messages.DeleteMany(message => true);

        private void Create(Message message) {
            _messages.InsertOne(message);
        }

        private Message GetByReceiver(string name) =>
            _messages.FindOneAndDelete(message => message.Receiver == name);

        private void Delete(string id) =>
            _messages.DeleteOne(message => message.Id == id);

        public string SendMessage(Message message) {
            Console.WriteLine(JsonSerializer.Serialize(message));
            if (_userService.GetByName(message.Receiver) == null) {
                return "Couldn't find this user.";
            }

            _messages.InsertOne(message);
            return "Ok";
        }

        public List<Message> GetMessage(string name) {
            List<Message> msgList = new List<Message>();
            while (true) {
                Message msg = this.GetByReceiver(name);
                if (msg == null) {
                    break;
                }
                msgList.Add(msg);
            }

            return msgList;
        }
    }
}