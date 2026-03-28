using System;
using System.Linq;
using System.Text.RegularExpressions;
using Prato.Midoffice.Models;

namespace Prato.Midoffice.Services
{
    public interface IValidationService
    {
        bool IsValidINSZ(string insz);
        bool IsValidIBAN(string iban);
        (bool IsValid, string Message) ValidateSnapshot(PersoonSnapshot snapshot);
    }

    public class ValidationService : IValidationService
    {
        public bool IsValidINSZ(string insz)
        {
            if (string.IsNullOrWhiteSpace(insz)) return false;
            
            var clean = Regex.Replace(insz, @"\D", "");
            if (clean.length != 11) return false;

            var basePart = long.Parse(clean.Substring(0, 9));
            var checkDigit = int.Parse(clean.Substring(9));

            // Check pre-2000
            if (97 - (basePart % 97) == checkDigit) return true;

            // Check post-2000 (prepend '2')
            var post2000Base = long.Parse("2" + clean.Substring(0, 9));
            if (97 - (post2000Base % 97) == checkDigit) return true;

            return false;
        }

        public bool IsValidIBAN(string iban)
        {
            if (string.IsNullOrWhiteSpace(iban)) return false;
            var clean = iban.Replace(" ", "").ToUpper();
            if (!clean.StartsWith("BE") || clean.Length != 16) return false;
            
            // Simplified check for prototype
            return Regex.IsMatch(clean, @"^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,30}$");
        }

        public (bool IsValid, string Message) ValidateSnapshot(PersoonSnapshot snapshot)
        {
            if (!IsValidINSZ(snapshot.INSZNummer))
                return (false, "Ongeldig Rijksregisternummer (INSZ).");
            
            if (!string.IsNullOrEmpty(snapshot.IBAN) && !IsValidIBAN(snapshot.IBAN))
                return (false, "Ongeldig Belgisch IBAN.");

            if (string.IsNullOrEmpty(snapshot.FamilieNaam) || string.IsNullOrEmpty(snapshot.Voornaam))
                return (false, "Naam en Voornaam zijn verplicht.");

            return (true, string.Empty);
        }
    }
}
