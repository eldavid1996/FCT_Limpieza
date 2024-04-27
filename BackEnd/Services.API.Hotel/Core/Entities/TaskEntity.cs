using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Services.API.Hotel.Core.Entities
{
    // Define a 'Task' Model
    // IN the DB : db.Task.createIndex({ "Room.RoomNumber": 1 }, { unique: true })
    [BsonCollectionAttribute("Task")]
    public class TaskEntity : Document
    {
        [BsonElement("Room")]
        public required RoomEntity Room { get; set; }

        [BsonElement("User")]
        public required string User { get; set; }

        [BsonElement("Priority")]
        public string? Priority { get; set; }

        [BsonElement("Observations")]
        public string? Observations { get; set; }
    }
}
