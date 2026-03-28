using System;

namespace Prato.Midoffice.Models
{
    public class Employer
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string RegistrationNumber { get; set; } = string.Empty;
    }
}
