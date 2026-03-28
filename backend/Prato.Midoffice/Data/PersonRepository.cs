using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Prato.Midoffice.Models;
using Npgsql;

namespace Prato.Midoffice.Data
{
    public interface IPersonRepository
    {
        Task<IEnumerable<PersoonSnapshot>> GetLatestSnapshotsByEmployerAsync(Guid employerId);
        Task<Guid> AddSnapshotAsync(Guid personId, PersoonSnapshot snapshot);
        Task<Guid> CreatePersonAsync(Guid employerId);
    }

    public class PersonRepository : IPersonRepository
    {
        private readonly string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private IDbConnection CreateConnection() => new NpgsqlConnection(_connectionString);

        public async Task<IEnumerable<PersoonSnapshot>> GetLatestSnapshotsByEmployerAsync(Guid employerId)
        {
            using var db = CreateConnection();
            var sql = @"
                SELECT 
                    s.insz_nummer as INSZNummer, 
                    s.familienaam as FamilieNaam, 
                    s.voornaam as Voornaam, 
                    s.geslacht as Geslacht,
                    s.gemeente as Gemeente,
                    s.taal as Taal,
                    lower(s.geldigheidsperiode) as AanvangsDatum
                FROM personen p
                JOIN persoon_snapshots s ON p.id = s.persoon_id
                WHERE p.werkgever_id = @EmployerId
                AND upper_inf(s.geldigheidsperiode)"; // Alleen de actuele snapshots
            
            return await db.QueryAsync<PersoonSnapshot>(sql, new { EmployerId = employerId });
        }

        public async Task<Guid> CreatePersonAsync(Guid employerId)
        {
            using var db = CreateConnection();
            return await db.ExecuteScalarAsync<Guid>(
                "INSERT INTO personen (werkgever_id) VALUES (@EmployerId) RETURNING id", 
                new { EmployerId = employerId });
        }

        public async Task<Guid> AddSnapshotAsync(Guid personId, PersoonSnapshot snapshot)
        {
            using var db = CreateConnection();
            if (db.State != ConnectionState.Open) db.Open();
            using var transaction = db.BeginTransaction();

            try
            {
                // 1. Sluit de huidige actuele snapshot af voor deze persoon
                var closeSql = @"
                    UPDATE persoon_snapshots 
                    SET geldigheidsperiode = tstzrange(lower(geldigheidsperiode), @NewStartDate)
                    WHERE persoon_id = @PersonId 
                    AND upper_inf(geldigheidsperiode)";
                
                await db.ExecuteAsync(closeSql, new { PersonId = personId, NewStartDate = snapshot.AanvangsDatum }, transaction);

                // 2. Voeg de nieuwe actuele snapshot toe
                var insertSql = @"
                    INSERT INTO persoon_snapshots (
                        persoon_id, geldigheidsperiode, insz_nummer, familienaam, voornaam, 
                        geslacht, taal, gemeente, land, email_loonbrief
                    ) VALUES (
                        @PersonId, tstzrange(@NewStartDate, NULL), @INSZNummer, @FamilieNaam, @Voornaam, 
                        @Geslacht, @Taal, @Gemeente, @Land, @EmailLoonbrief
                    ) RETURNING id";

                var newSnapshotId = await db.ExecuteScalarAsync<Guid>(insertSql, new {
                    PersonId = personId,
                    NewStartDate = snapshot.AanvangsDatum,
                    snapshot.INSZNummer,
                    snapshot.FamilieNaam,
                    snapshot.Voornaam,
                    Geslacht = snapshot.Geslacht.ToString(),
                    Taal = snapshot.Taal.ToString(),
                    snapshot.Gemeente,
                    snapshot.Land,
                    snapshot.EmailLoonbrief
                }, transaction);

                transaction.Commit();
                return newSnapshotId;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
