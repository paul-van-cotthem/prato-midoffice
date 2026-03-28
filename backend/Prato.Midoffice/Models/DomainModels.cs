using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Prato.Midoffice.Models
{
    public enum Geslacht { Man, Vrouw, X }
    
    public enum BurgerlijkeStaat 
    { 
        Ongehuwd, Gehuwd, Weduwe, WettelijkGescheiden, FeitelijkGescheiden, 
        Samenwonend, FeitelijkSamenwonend, ScheidingVanTafelEnBed 
    }

    public enum TypeBVBerekening { VastPercentage, Schalen }

    public enum PartnerInkomsten 
    { 
        EigenInkomsten, EigenInkomstenOnderGrens3, EigenInkomstenOnderGrens2, 
        EigenInkomstenOnderGrens1, GeenEigenInkomsten 
    }

    public enum Taal { Nederlands, Frans }

    public class PersoonSnapshot
    {
        [JsonPropertyName("aanvangsDatum")]
        public DateTime AanvangsDatum { get; set; }

        public List<string> Werknemerskengetallen { get; set; } = new();

        public DateTime? DatumInDienst { get; set; }
        public DateTime? GepensioneerdVanaf { get; set; }
        public string INSZNummer { get; set; } = string.Empty;
        public string FamilieNaam { get; set; } = string.Empty;
        public string Voornaam { get; set; } = string.Empty;
        public Geslacht Geslacht { get; set; }
        
        public string? Straat { get; set; }
        public string? Huisnummer { get; set; }
        public string? Bus { get; set; }
        public string? Gemeente { get; set; }
        public string? PostCode { get; set; }
        public string? Land { get; set; } = "België";
        
        public string? IBAN { get; set; }
        public string? BIC { get; set; }
        
        public BurgerlijkeStaat? BurgerlijkeStaat { get; set; }
        public TypeBVBerekening? TypeBvBerekening { get; set; }
        public decimal? VastBvPercentage { get; set; }
        public bool? Mindervalide { get; set; }
        public PartnerInkomsten? PartnerInkomsten { get; set; }
        public bool? PartnerMindervalide { get; set; }
        
        public int? AantalKinderenTenLaste { get; set; }
        public int? AantalMindervalideKinderenTenLaste { get; set; }
        public int? AantalOuderePersonenTenLaste { get; set; }
        public int? AantalMindervalideOuderePersonenTenLaste { get; set; }
        public int? AantalAnderePersonenTenLaste { get; set; }
        public int? AantalAndereMindervalidePersonenTenLaste { get; set; }
        public int? AantalZorgbehoevendeOuderePersonenTenLaste { get; set; }
        
        public DateTime? Geboortedatum { get; set; }
        public string? GeboortePlaats { get; set; }
        public Taal Taal { get; set; } = Taal.Nederlands;
        public string? EmailLoonbrief { get; set; }
    }

    public class PersoonGewijzigd
    {
        public string PersoonReferentieId { get; set; } = string.Empty;
        public string WerkgeverReferentieId { get; set; } = string.Empty;
        public DateTime RecordDatum { get; set; } = DateTime.Now;
        public List<PersoonSnapshot> PersoonSnapshots { get; set; } = new();
    }
}
