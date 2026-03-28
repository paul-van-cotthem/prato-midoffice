using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Prato.Midoffice.Models;
using Npgsql;

namespace Prato.Midoffice.Data
{
    public interface IEmployerRepository
    {
        Task<IEnumerable<Employer>> GetAllAsync();
        Task<Employer?> GetByIdAsync(Guid id);
        Task<Guid> CreateAsync(Employer employer);
    }

    public class EmployerRepository : IEmployerRepository
    {
        private readonly string _connectionString;

        public EmployerRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

        public async Task<IEnumerable<Employer>> GetAllAsync()
        {
            using var db = CreateConnection();
            return await db.QueryAsync<Employer>("SELECT id, naam as Name, ondernemingsnummer as RegistrationNumber FROM werkgevers");
        }

        public async Task<Employer?> GetByIdAsync(Guid id)
        {
            using var db = CreateConnection();
            return await db.QueryFirstOrDefaultAsync<Employer>(
                "SELECT id, naam as Name, ondernemingsnummer as RegistrationNumber FROM werkgevers WHERE id = @Id", 
                new { Id = id });
        }

        public async Task<Guid> CreateAsync(Employer employer)
        {
            using var db = CreateConnection();
            var sql = "INSERT INTO werkgevers (naam, ondernemingsnummer) VALUES (@Name, @RegistrationNumber) RETURNING id";
            return await db.ExecuteScalarAsync<Guid>(sql, employer);
        }
    }
}
