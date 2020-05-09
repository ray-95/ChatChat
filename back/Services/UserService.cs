using MongoDB.Driver;
using chat.Models;
using chat.Settings;
using System.Collections.Generic;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.RegularExpressions;
using System.Security.Claims;
using System;

namespace chat.Services {
    public class UserService {
        private readonly IMongoCollection<User> _users;
        private readonly string _secret;

        public UserService(DbSettings dbSettings, JwtSettings jwtSettings) {
            var client = new MongoClient(dbSettings.ConnectionString);
            var database = client.GetDatabase(dbSettings.DatabaseName);
            _users = database.GetCollection<User>("Users");

            _secret = jwtSettings.Secret;
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

            if (!Regex.Match(user.Name, @"^[a-zA-Z0-9_-]{4,16}$").Success) {
                return "Username can only contain letters, numbers, hyphens and underscores, and must be between 4 and 16 characters long.";
            }

            if (!Regex.Match(user.Password, @"(?=.{6,18})").Success) {
                return "Password must be between 6 and 18 characters long.";
            }

            Create(user);
            return "Ok";
        }

        public string[] SignIn(User user) {
            if (this.GetByName(user.Name) == null) {
                return new string[]{"Couldn't find your account."};
            }

            if (this.GetByName(user.Name)
                .Password != user.Password) {
                return new string[]{"Wrong password."};
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Name, user.Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new string[]{"Ok", tokenHandler.WriteToken(token)};
        }
    }
}