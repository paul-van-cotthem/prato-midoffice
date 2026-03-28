import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Employer {
  id: string;
  name: string;
  registrationNumber: string;
}

const MOCK_EMPLOYERS: Employer[] = [
  { id: 'emp-001', name: 'Prato Belgium NV', registrationNumber: '0123.456.789' },
  { id: 'emp-002', name: 'TechSolutions BV', registrationNumber: '0987.654.321' },
  { id: 'emp-003', name: 'Loonmotor Logistics', registrationNumber: '0555.444.333' }
];

interface EmployerContextType {
  currentEmployer: Employer | null;
  setCurrentEmployer: (employer: Employer | null) => void;
  allEmployers: Employer[];
}

const EmployerContext = createContext<EmployerContextType | undefined>(undefined);

export function EmployerProvider({ children }: { children: React.ReactNode }) {
  const [currentEmployer, setCurrentEmployer] = useState<Employer | null>(() => {
    const saved = localStorage.getItem('prato-active-employer');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentEmployer) {
      localStorage.setItem('prato-active-employer', JSON.stringify(currentEmployer));
    } else {
      localStorage.removeItem('prato-active-employer');
    }
  }, [currentEmployer]);

  return (
    <EmployerContext.Provider value={{ currentEmployer, setCurrentEmployer, allEmployers: MOCK_EMPLOYERS }}>
      {children}
    </EmployerContext.Provider>
  );
}

export const useEmployer = () => {
  const context = useContext(EmployerContext);
  if (!context) throw new Error('useEmployer must be used within EmployerProvider');
  return context;
};
