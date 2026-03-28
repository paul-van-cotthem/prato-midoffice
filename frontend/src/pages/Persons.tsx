import { useTranslation } from 'react-i18next';
import { useEmployer } from '../components/EmployerProvider';
import { useData } from '../components/DataProvider';
import { User, MapPin, CreditCard, ChevronRight, Search, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidINSZ, formatINSZ } from '../utils/validation';

export default function Persons() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentEmployer } = useEmployer();
  const { persons: allPersons, addPerson } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreatePerson = () => {
    if (!currentEmployer) return;
    
    const personId = `PERS-${Date.now().toString().slice(-6)}`;
    
    addPerson({
      id: personId,
      werkgeverId: currentEmployer.id,
      snapshots: [{
        aanvangsDatum: new Date().toISOString().split('T')[0],
        inszNummer: '00.00.00-000.00',
        familieNaam: 'Nieuwe',
        voornaam: 'Medewerker',
        geslacht: 'Man',
        straat: '',
        huisnummer: '',
        gemeente: '',
        postCode: '',
        land: 'België',
        iban: '',
        bic: '',
        burgerlijkeStaat: 'Ongehuwd',
        mindervalide: false,
        taal: 'Nederlands',
        emailLoonbrief: '',
        werknemerskengetallen: [],
        aantalKinderenTenLaste: 0,
        aantalMindervalideKinderenTenLaste: 0,
        geboortePlaats: '',
        geboorteDatum: '1990-01-01'
      }]
    });

    navigate(`/person/${personId}/add-snapshot`);
  };

  const persons = currentEmployer ? allPersons.filter(p => p.werkgeverId === currentEmployer.id) : [];
  
  const filteredPersons = persons.filter(p => {
    const s = p.snapshots[0];
    const search = searchTerm.toLowerCase();
    return s.familieNaam.toLowerCase().includes(search) || 
           s.voornaam.toLowerCase().includes(search) ||
           s.inszNummer.includes(search);
  });

  if (!currentEmployer) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center animate-in fade-in duration-700">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-800 shadow-inner">
          <Search className="text-slate-400 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{t('persons.no_employer_title')}</h2>
        <p className="text-slate-500 max-w-sm">{t('persons.no_employer_subtitle')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{t('navigation.persons')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {t('persons.subtitle')} <span className="text-emerald-500 font-semibold">{currentEmployer.name}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleCreatePerson}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              {t('dashboard.new_person') || 'Nieuwe Persoon'}
            </button>
            <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text"
                 placeholder={t('persons.search_placeholder')}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-card border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all shadow-sm"
               />
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-4">
        {filteredPersons.length > 0 ? (
          filteredPersons.map((person) => {
            const snapshot = person.snapshots[0];
            const isValid = isValidINSZ(snapshot.inszNummer);

            return (
              <Link 
                key={person.id}
                to={`/person/${person.id}/add-snapshot`}
                className="group p-5 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between hover:shadow-xl hover:border-emerald-500/40 hover:scale-[100.2%] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-800 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all shadow-sm">
                      <User className="w-7 h-7" />
                    </div>
                    {isValid ? (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-sm" title="Valide data">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    ) : (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-sm" title="Check data">
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{snapshot.voornaam} {snapshot.familieNaam}</h3>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-emerald-500/60" />
                        <span className="font-mono">{formatINSZ(snapshot.inszNummer)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-500/60" />
                        <span>{snapshot.gemeente}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   {!isValid && (
                     <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-lg">
                       {t('persons.data_incomplete')}
                     </span>
                   )}
                   <div className="hidden sm:block px-4 py-1.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-slate-200 dark:border-slate-800">
                     {person.snapshots.length} {t('persons.snapshots_count')}
                   </div>
                   <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20">
            <p className="text-slate-500">{t('persons.no_results')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
