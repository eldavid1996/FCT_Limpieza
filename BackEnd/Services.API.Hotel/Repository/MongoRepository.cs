
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Services.API.Hotel.Core;
using Services.API.Hotel.Core.Entities;
using MongoDB.Bson;

namespace Services.API.Hotel.Repository
{
    // Class that implements Generic Methods for API (CRUD)
    public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : IDocument
    {

        private readonly IMongoCollection<TDocument> _collection;

        private protected string GetCollectionName(Type documentType)
        {
            return ((BsonCollectionAttribute)documentType.GetCustomAttributes(typeof(BsonCollectionAttribute), true).FirstOrDefault()).CollectionName;
        }

        public MongoRepository(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var db = client.GetDatabase(options.Value.Database);

            _collection = db.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
        }

        // Generic Methods for API (CRUD)
        public async Task<IEnumerable<TDocument>> GetAll()
        {
            return await _collection.Find(p => true).ToListAsync();
        }

        public async Task<TDocument> GetById(string Id)
        {
            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, Id);
            return await _collection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task InsertDocument(TDocument document)
        {
            await _collection.InsertOneAsync(document);
        }

        public async Task UpdateDocument(TDocument document)
        {
            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, document.Id);
            await _collection.FindOneAndReplaceAsync(filter, document);
        }

        public async Task DeleteById(string Id)
        {
            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, Id);
            await _collection.FindOneAndDeleteAsync(filter);
        }

        public async Task<PaginationDto<TDocument>> PaginationBy(PaginationDto<TDocument> pagination)
        {
            var sort = Builders<TDocument>.Sort.Ascending(pagination.Sort);

            if (pagination.SortDirection == "desc")
            {
                sort = Builders<TDocument>.Sort.Descending(pagination.Sort);
            }

            var totalDocuments = 0;

            if (pagination.Filter == null)
            {
                pagination.Data = await _collection.Find(p => true)
                                    .Sort(sort)
                                    .Skip((pagination.Page - 1) * pagination.PageSize)
                                    .Limit(pagination.PageSize)
                                    .ToListAsync();
               totalDocuments = (await _collection.Find(p => true).ToListAsync()).Count();
            }
            else
            {
                var filterValue = ".*" + pagination.Filter.Value + ".*";
                var filter = Builders<TDocument>.Filter.Regex(pagination.Filter.Property, new BsonRegularExpression(filterValue, "i"));

                pagination.Data = await _collection.Find(filter)
                                    .Sort(sort)
                                    .Skip((pagination.Page - 1) * pagination.PageSize)
                                    .Limit(pagination.PageSize)
                                    .ToListAsync();
                totalDocuments = (await _collection.Find(filter).ToListAsync()).Count();
            }

            var rounded = Math.Ceiling(totalDocuments / Convert.ToDecimal(pagination.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            pagination.PagesQuantity = totalPages;
            pagination.TotalRows = Convert.ToInt32(totalDocuments);

            return pagination;
        }
    }
}
