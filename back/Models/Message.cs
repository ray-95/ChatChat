using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace chat.Models {
    public class Message {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Receiver")]
        public string Receiver { get; set; }

        [BsonElement("Sender")]
        public string Sender { get; set; }

        [BsonElement("Content")]
        public string Content { get; set; }

        [BsonElement("Time")]
        public decimal Time { get; set; }
    }
}