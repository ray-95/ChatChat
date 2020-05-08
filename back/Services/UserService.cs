using MongoDB.Driver;
using chat.Models;
using System.Collections.Generic;
using System.Linq;

namespace chat.Services {
    public class UserService {
        private readonly IMongoCollection<User> _users;

        public UserService(DbSettings settings) {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>("Users");
        }

        public List<User> GetAll() =>
            _users.Find(user => true).ToList();

        public void DeleteAll() =>
            _users.DeleteMany(user => true);

        public void Create(User user) {
            _users.InsertOne(user);
        }

        public User GetByName(string name) =>
            _users.Find(user => user.Name == name).FirstOrDefault();

        public void Delete(string name) =>
            _users.DeleteOne(user => user.Name == name);

        public string SignUp(User user) {
            if (this.GetByName(user.Name) != null) {
                return $"Username {user.Name} is not available.";
            }
            Create(user);
            return "Ok";
        }

        public string SignIn(User user) {
            if (this.GetByName(user.Name) == null) {
                return "Couldn't find your account.";
            }

            if (this.GetByName(user.Name)
                .Password != user.Password) {
                return "Wrong password.";
            }

            return "Ok";
        }

        public string DeleteAccount(User user) {
            string msg = this.SignIn(user);
            if (msg == "Ok") {
                this.Delete(user.Name);
            }
            return msg;
        }
    }
}