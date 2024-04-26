using Services.API.Hotel.Core.Entities;

namespace Services.API.Hotel.Repository
{
    // Interface for Generic Methods for API (CRUD)
    public interface IMongoRepository<TDocument> where TDocument : IDocument
    {
        Task<IEnumerable<TDocument>> GetAll();

        Task<TDocument> GetById(string Id);

        Task InsertDocument(TDocument document);

        Task UpdateDocument(TDocument document);

        Task DeleteById(string Id);

        Task<PaginationDto<TDocument>> PaginationBy(
            PaginationDto<TDocument> pagination
        );
    }
}
