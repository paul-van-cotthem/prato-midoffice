import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { 
  type Persoon, 
  type Employer, 
  type Contract, 
  type PayrollRun,
  MOCK_PERSONS, 
  MOCK_EMPLOYERS,
  MOCK_CONTRACTS,
  MOCK_PAYROLL_RUNS
} from '../mocks/db';

export interface BackendMessage {
  id: string;
  type: 'PersoonGewijzigd' | 'WerkgeverGewijzigd' | 'ContractGewijzigd' | 'PayrollRunGestart';
  payload: any;
  timestamp: string;
  status: 'Pending' | 'Sent' | 'Processed' | 'Error';
}

interface DataContextType {
  persons: Persoon[];
  employers: Employer[];
  contracts: Contract[];
  payrollRuns: PayrollRun[];
  messageQueue: BackendMessage[];
  addPerson: (person: Persoon) => void;
  updatePerson: (id: string, updatedPerson: Partial<Persoon>) => void;
  addEmployer: (employer: Employer) => void;
  addContract: (contract: Contract) => void;
  addPayrollRun: (run: PayrollRun) => void;
  updatePayrollRun: (id: string, updatedRun: Partial<PayrollRun>) => void;
  addToQueue: (type: BackendMessage['type'], payload: any) => void;
  clearQueue: () => void;
  processMessage: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Persistence Keys
  const STORAGE_KEY_PERSONS = 'prato_midoffice_persons';
  const STORAGE_KEY_EMPLOYERS = 'prato_midoffice_employers';
  const STORAGE_KEY_CONTRACTS = 'prato_midoffice_contracts';
  const STORAGE_KEY_RUNS = 'prato_midoffice_runs';
  const STORAGE_KEY_MESSAGES = 'prato_midoffice_messages';

  // State initialization
  const [persons, setPersons] = useState<Persoon[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PERSONS);
    return saved ? JSON.parse(saved) : MOCK_PERSONS;
  });

  const [employers, setEmployers] = useState<Employer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EMPLOYERS);
    return saved ? JSON.parse(saved) : MOCK_EMPLOYERS;
  });

  const [contracts, setContracts] = useState<Contract[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CONTRACTS);
    return saved ? JSON.parse(saved) : MOCK_CONTRACTS;
  });

  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_RUNS);
    return saved ? JSON.parse(saved) : MOCK_PAYROLL_RUNS;
  });

  const [messageQueue, setMessageQueue] = useState<BackendMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PERSONS, JSON.stringify(persons));
  }, [persons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EMPLOYERS, JSON.stringify(employers));
  }, [employers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONTRACTS, JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RUNS, JSON.stringify(payrollRuns));
  }, [payrollRuns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messageQueue));
  }, [messageQueue]);

  // Messaging Logic
  const processMessage = (id: string) => {
    setMessageQueue(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status: 'Sent' } : msg
    ));
    
    setTimeout(() => {
      setMessageQueue(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status: 'Processed' } : msg
      ));
    }, 3000);
  };

  const addToQueue = (type: BackendMessage['type'], payload: any) => {
    const newMessage: BackendMessage = {
      id: `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      payload,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    setMessageQueue(prev => [newMessage, ...prev]);

    // Simulate Background Processing
    setTimeout(() => {
      processMessage(newMessage.id);
    }, 2000);
  };

  const clearQueue = () => setMessageQueue([]);

  // Data Mutation Helpers
  const mapToPascalCaseSnapshot = (snapshot: any) => ({
    AanvangsDatum: snapshot.aanvangsDatum,
    Werknemerskengetallen: snapshot.werknemerskengetallen,
    DatumInDienst: snapshot.datumInDienst,
    GepensioneerdVanaf: snapshot.gepensionneerdVanaf,
    INSZNummer: snapshot.inszNummer,
    FamilieNaam: snapshot.familieNaam,
    Voornaam: snapshot.voornaam,
    Geslacht: snapshot.geslacht,
    Straat: snapshot.straat,
    Huisnummer: snapshot.huisnummer,
    Bus: snapshot.bus,
    Gemeente: snapshot.gemeente,
    PostCode: snapshot.postCode,
    Land: snapshot.land,
    IBAN: snapshot.iban,
    BIC: snapshot.bic,
    BurgerlijkeStaat: snapshot.burgerlijkeStaat,
    TypeBvBerekening: snapshot.typeBvBerekening,
    VastBvPercentage: snapshot.vastBvPercentage,
    Mindervalide: snapshot.mindervalide,
    PartnerInkomsten: snapshot.partnerInkomsten,
    PartnerMindervalide: snapshot.partnerMindervalide,
    AantalKinderenTenLaste: snapshot.aantalKinderenTenLaste,
    AantalMindervalideKinderenTenLaste: snapshot.aantalMindervalideKinderenTenLaste,
    AantalOuderePersonenTenLaste: snapshot.aantalOuderePersonenTenLaste,
    Geboortedatum: snapshot.geboorteDatum,
    GeboortePlaats: snapshot.geboortePlaats,
    Taal: snapshot.taal,
    EmailLoonbrief: snapshot.emailLoonbrief
  });

  const addPerson = (person: Persoon) => {
    setPersons((prev) => [person, ...prev]);
    addToQueue('PersoonGewijzigd', {
      PersoonReferentieId: person.id,
      WerkgeverReferentieId: person.werkgeverId,
      RecordDatum: new Date().toISOString(),
      PersoonSnapshots: person.snapshots.map(mapToPascalCaseSnapshot)
    });
  };

  const updatePerson = (id: string, updatedPerson: Partial<Persoon>) => {
    setPersons((prev) => {
      const newPersons = prev.map(p => p.id === id ? { ...p, ...updatedPerson } : p);
      const affected = newPersons.find(p => p.id === id);
      if (affected) {
        addToQueue('PersoonGewijzigd', {
          PersoonReferentieId: affected.id,
          WerkgeverReferentieId: affected.werkgeverId,
          RecordDatum: new Date().toISOString(),
          PersoonSnapshots: affected.snapshots.map(mapToPascalCaseSnapshot)
        });
      }
      return newPersons;
    });
  };

  const addEmployer = (employer: Employer) => {
    setEmployers((prev) => [employer, ...prev]);
    addToQueue('WerkgeverGewijzigd', {
      WerkgeverReferentieId: employer.id,
      Naam: employer.name,
      BtwNummer: employer.vatNumber,
      Sector: employer.sector,
      Adres: {
        Straat: employer.address.street,
        Huisnummer: employer.address.number,
        Gemeente: employer.address.city,
        PostCode: employer.address.postalCode
      }
    });
  };

  const addContract = (contract: Contract) => {
    setContracts((prev) => [contract, ...prev]);
    addToQueue('ContractGewijzigd', {
      ContractReferentieId: contract.id,
      PersoonReferentieId: contract.personId,
      WerkgeverReferentieId: contract.employerId,
      Type: contract.type,
      StartDatum: contract.startDate,
      EindDatum: contract.endDate,
      SalarisBasis: contract.salaryBasis
    });
  };

  const addPayrollRun = (run: PayrollRun) => {
    setPayrollRuns((prev) => [run, ...prev]);
    addToQueue('PayrollRunGestart', {
      RunReferentieId: run.id,
      WerkgeverReferentieId: run.employerId,
      Periode: run.period,
      Status: run.status,
      AantalBerekeningen: run.calculationCount
    });
  };

  const updatePayrollRun = (id: string, updatedRun: Partial<PayrollRun>) => {
    setPayrollRuns((prev) => prev.map(r => r.id === id ? { ...r, ...updatedRun } : r));
  };

  return (
    <DataContext.Provider value={{ 
      persons, 
      employers, 
      contracts, 
      payrollRuns, 
      messageQueue,
      addPerson, 
      updatePerson, 
      addEmployer,
      addContract,
      addPayrollRun,
      updatePayrollRun,
      addToQueue,
      clearQueue,
      processMessage
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
