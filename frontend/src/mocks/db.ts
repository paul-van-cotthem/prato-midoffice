export interface PersoonSnapshot {
  aanvangsDatum: string;
  werknemerskengetallen: string[];
  datumInDienst?: string;
  gepensioneerdVanaf?: string;
  inszNummer: string;
  familieNaam: string;
  voornaam: string;
  geslacht: 'Man' | 'Vrouw' | 'X';
  straat: string;
  huisnummer: string;
  bus?: string;
  gemeente: string;
  postCode: string;
  land: string;
  iban: string;
  bic: string;
  burgerlijkeStaat: 'Ongehuwd' | 'Gehuwd' | 'Samenwonend' | 'Weduwnaar' | 'Gescheiden';
  typeBvBerekening?: 'VastPercentage' | 'Schalen';
  vastBvPercentage?: number;
  mindervalide: boolean;
  partnerInkomsten?: string;
  partnerMindervalide?: boolean;
  aantalKinderenTenLaste: number;
  aantalMindervalideKinderenTenLaste: number;
  aantalOuderePersonenTenLaste?: number;
  geboorteDatum?: string;
  geboortePlaats: string;
  taal: 'Nederlands' | 'Frans';
  emailLoonbrief: string;
}

export interface Persoon {
  id: string;
  werkgeverId: string;
  snapshots: PersoonSnapshot[];
}

export const MOCK_PERSONS: Persoon[] = [
  {
    id: 'pers-001',
    werkgeverId: 'emp-001',
    snapshots: [
      {
        aanvangsDatum: '2024-01-01',
        inszNummer: '85.01.01-123.87',
        familieNaam: 'Janssens',
        voornaam: 'Dirk',
        geslacht: 'Man',
        straat: 'Stationsstraat',
        huisnummer: '45',
        gemeente: 'Antwerpen',
        postCode: '2000',
        land: 'België',
        iban: 'BE12 3456 7890 1234',
        bic: 'BRUABEBB',
        burgerlijkeStaat: 'Gehuwd',
        mindervalide: false,
        taal: 'Nederlands',
        geboorteDatum: '1985-01-01',
        geboortePlaats: 'Hasselt',
        emailLoonbrief: 'dirk.janssens@prato.be',
        werknemerskengetallen: ['10', '21'],
        aantalKinderenTenLaste: 2,
        aantalMindervalideKinderenTenLaste: 0
      }
    ]
  },
  {
    id: 'pers-002',
    werkgeverId: 'emp-001',
    snapshots: [
      {
        aanvangsDatum: '2023-10-15',
        inszNummer: '92.05.20-456.38',
        familieNaam: 'Dupont',
        voornaam: 'Emilie',
        geslacht: 'Vrouw',
        straat: 'Rue Royale',
        huisnummer: '102',
        bus: 'B',
        gemeente: 'Brussel',
        postCode: '1000',
        land: 'België',
        iban: 'BE98 7654 3210 9876',
        bic: 'KREDBEBB',
        burgerlijkeStaat: 'Ongehuwd',
        mindervalide: true,
        taal: 'Frans',
        geboorteDatum: '1992-05-20',
        geboortePlaats: 'Namur',
        emailLoonbrief: 'emilie.dupont@tech.be',
        werknemerskengetallen: ['05'],
        aantalKinderenTenLaste: 0,
        aantalMindervalideKinderenTenLaste: 0
      }
    ]
  },
  {
    id: 'pers-003',
    werkgeverId: 'emp-002',
    snapshots: [
      {
        aanvangsDatum: '2024-03-01',
        inszNummer: '78.12.12-999.00',
        familieNaam: 'Vermeulen',
        voornaam: 'An',
        geslacht: 'Vrouw',
        straat: 'Lindenlei',
        huisnummer: '3',
        gemeente: 'Gent',
        postCode: '9000',
        land: 'België',
        iban: 'BE45 1111 2222 3333',
        bic: 'BNPABEBB',
        burgerlijkeStaat: 'Samenwonend',
        mindervalide: false,
        aantalKinderenTenLaste: 3,
        aantalMindervalideKinderenTenLaste: 1,
        taal: 'Nederlands',
        geboorteDatum: '1978-12-12',
        geboortePlaats: 'Gent',
        emailLoonbrief: 'an.vermeulen@logistics.com',
        werknemerskengetallen: ['01', '99']
      }
    ]
  }
];

export interface Employer {
  id: string;
  name: string;
  vatNumber: string;
  sector: string;
  address: {
    street: string;
    number: string;
    city: string;
    postalCode: string;
  };
  activeEmployees: number;
}

export interface Contract {
  id: string;
  personId: string;
  employerId: string;
  type: 'Bediende' | 'Arbeider' | 'Student';
  startDate: string;
  endDate?: string;
  status: 'Actief' | 'Beëindigd' | 'Toekomstig';
  salaryBasis: number; // monthly or hourly
}

export interface PayrollRun {
  id: string;
  employerId: string;
  period: string;
  status: 'Processing' | 'Completed' | 'Error';
  totalNet: number;
  calculationCount: number;
  errorCount: number;
  createdAt: string;
}

export interface SalaryCalculation {
  id: string;
  runId: string;
  personId: string;
  gross: number;
  net: number;
  taxes: number;
  socialSecurity: number;
  components: { label: string; amount: number; type: 'plus' | 'minus' }[];
  status: 'Success' | 'Warning' | 'Error';
  engineFeedback?: string;
}

export const MOCK_EMPLOYERS: Employer[] = [
  {
    id: 'emp-001',
    name: 'Prato Belgium HQ',
    vatNumber: 'BE 0123.456.789',
    sector: 'HR Tech & Services',
    address: {
      street: 'Hasseltsesteenweg',
      number: '12',
      city: 'Hasselt',
      postalCode: '3500'
    },
    activeEmployees: 156
  },
  {
    id: 'emp-002',
    name: 'Tech Solutions BV',
    vatNumber: 'BE 0987.654.321',
    sector: 'Software Development',
    address: {
      street: 'Wetenschapsstraat',
      number: '5',
      city: 'Leuven',
      postalCode: '3000'
    },
    activeEmployees: 42
  },
  {
    id: 'emp-003',
    name: 'Logistics International',
    vatNumber: 'BE 0444.555.666',
    sector: 'Transport & Logic',
    address: {
      street: 'Kaaienweg',
      number: '100',
      city: 'Antwerpen',
      postalCode: '2000'
    },
    activeEmployees: 850
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'con-001',
    personId: 'pers-001',
    employerId: 'emp-001',
    type: 'Bediende',
    startDate: '2024-01-01',
    status: 'Actief',
    salaryBasis: 3500
  },
  {
    id: 'con-002',
    personId: 'pers-002',
    employerId: 'emp-001',
    type: 'Bediende',
    startDate: '2023-10-15',
    status: 'Actief',
    salaryBasis: 3200
  },
  {
    id: 'con-003',
    personId: 'pers-003',
    employerId: 'emp-002',
    type: 'Arbeider',
    startDate: '2024-03-01',
    status: 'Actief',
    salaryBasis: 16.50
  }
];

export const MOCK_PAYROLL_RUNS: PayrollRun[] = [
  { id: 'run-001', employerId: 'emp-001', period: '2024-03', status: 'Completed', totalNet: 42500.80, calculationCount: 12, errorCount: 0, createdAt: '2024-03-25T10:00:00Z' },
  { id: 'run-002', employerId: 'emp-002', period: '2024-03', status: 'Error', totalNet: 0, calculationCount: 8, errorCount: 1, createdAt: '2024-03-26T14:30:00Z' },
  { id: 'run-003', employerId: 'emp-001', period: '2024-04', status: 'Processing', totalNet: 18400.00, calculationCount: 12, errorCount: 0, createdAt: '2024-03-28T09:15:00Z' },
];

export const MOCK_CALCULATIONS: SalaryCalculation[] = [
  {
    id: 'calc-001',
    runId: 'run-001',
    personId: 'pers-001',
    gross: 3500,
    net: 2420.50,
    taxes: 840.20,
    socialSecurity: 419.30,
    components: [
      { label: 'Bruto Salaris', amount: 3500, type: 'plus' },
      { label: 'Bedrijfsvoorheffing', amount: 840.20, type: 'minus' },
      { label: 'RSZ', amount: 419.30, type: 'minus' },
      { label: 'Maaltijdcheques', amount: 180, type: 'plus' },
    ],
    status: 'Success'
  },
  {
    id: 'calc-002',
    runId: 'run-002',
    personId: 'pers-002',
    gross: 3200,
    net: 0,
    taxes: 0,
    socialSecurity: 0,
    components: [],
    status: 'Error',
    engineFeedback: 'Earnie Engine Error: Ontbrekende fiscale Snapshot voor periode 2024-03. Synchroniseer data vanuit het personeelsdossier.'
  }
];

export const getPersonsByEmployer = (employerId: string) => {
  return MOCK_PERSONS.filter(p => p.werkgeverId === employerId);
};

export const getEmployerById = (id: string) => MOCK_EMPLOYERS.find(e => e.id === id);
export const getPersonById = (id: string) => MOCK_PERSONS.find(p => p.id === id);
export const getPayrollRuns = () => MOCK_PAYROLL_RUNS;
export const getCalculationsByRunId = (runId: string) => MOCK_CALCULATIONS.filter(c => c.runId === runId);

export const db = {
  getPersons: () => MOCK_PERSONS,
  getPersonById: (id: string) => MOCK_PERSONS.find(p => p.id === id),
  getEmployers: () => MOCK_EMPLOYERS,
  getEmployerById: (id: string) => MOCK_EMPLOYERS.find(e => e.id === id),
  getContracts: () => MOCK_CONTRACTS,
  getPayrollRuns: () => MOCK_PAYROLL_RUNS,
  getCalculationsByRunId: (runId: string) => MOCK_CALCULATIONS.filter(c => c.runId === runId),
};
