namespace Services.API.Hotel.Core.Entities
{
    // Helped Class for indicate MongoDB Collection Name 
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class BsonCollectionAttribute : Attribute
    {
        public string CollectionName { get; }

        public BsonCollectionAttribute(string collectionName) {
            CollectionName = collectionName;
        }
    }
}
