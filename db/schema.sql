-- Database schema voor Prato Mid-office
-- Vereist: PostgreSQL 16 met btree_gist extensie

-- Stap 1: Activeer btree_gist voor temporele integriteit
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Stap 2: Werkgevers (Employers)
CREATE TABLE IF NOT EXISTS werkgevers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    naam TEXT NOT NULL,
    ondernemingsnummer TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stap 3: Personen (Persons)
CREATE TABLE IF NOT EXISTS personen (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    werkgever_id UUID NOT NULL REFERENCES werkgevers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stap 4: Persoon Snapshots (De 'Earnie' data)
-- We gebruiken tstzrange (timestamp with time zone range) voor bi-temporaliteit
CREATE TABLE IF NOT EXISTS persoon_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    persoon_id UUID NOT NULL REFERENCES personen(id) ON DELETE CASCADE,
    
    -- Temporele geldigheid: [AanvangsDatum, Infinity)
    geldigheidsperiode TSTZRANGE NOT NULL,
    
    -- Snapshot data (conform Elvive.Berichten.Persoon)
    insz_nummer TEXT NOT NULL,
    familienaam TEXT NOT NULL,
    voornaam TEXT NOT NULL,
    geslacht TEXT NOT NULL CHECK (geslacht IN ('Man', 'Vrouw', 'X')),
    geboortedatum DATE,
    geboorteplaats TEXT,
    
    -- Adresgegevens
    straat TEXT,
    huisnummer TEXT,
    bus TEXT,
    postcode TEXT,
    gemeente TEXT,
    land TEXT DEFAULT 'België',
    
    -- Payroll & Bank
    iban TEXT,
    bic TEXT,
    taal TEXT NOT NULL CHECK (taal IN ('Nederlands', 'Frans')),
    email_loonbrief TEXT,
    
    -- Fiscale parameters
    burgerlijke_staat TEXT,
    aantal_kinderen_ten_laste INTEGER DEFAULT 0,
    mindervalide BOOLEAN DEFAULT FALSE,
    type_bv_berekening TEXT, -- VastPercentage, Schalen
    vast_bv_percentage DECIMAL(5,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- CRITIEK: Voorkom overlappende snapshots voor dezelfde persoon!
    -- Dit maakt gebruik van de btree_gist extensie
    EXCLUDE USING gist (persoon_id WITH =, geldigheidsperiode WITH &&)
);

-- Indexen
CREATE INDEX IF NOT EXISTS idx_persoon_snapshots_range ON persoon_snapshots USING gist (geldigheidsperiode);
CREATE INDEX IF NOT EXISTS idx_persoon_snapshots_current ON persoon_snapshots (persoon_id) WHERE (upper_inf(geldigheidsperiode));
