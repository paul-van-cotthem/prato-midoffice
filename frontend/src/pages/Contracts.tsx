import { FileText, Calendar, Search, Filter, History, Euro, ExternalLink, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../components/DataProvider';
import { useState } from 'react';

export default function Contracts() {
  const { t } = useTranslation();
  const { contracts, persons, employers } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = contracts.filter(c => {
    const person = persons.find(p => p.id === c.personId);
    const employer = employers.find(e => e.id === c.employerId);
    const fullName = person ? `${person.snapshots[0].voornaam} ${person.snapshots[0].familieNaam}`.toLowerCase() : '';
    const empName = employer ? employer.name.toLowerCase() : '';
    const search = searchTerm.toLowerCase();

    return fullName.includes(search) || empName.includes(search) || c.id.toLowerCase().includes(search);
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50">{t('contracts.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t('contracts.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold group">
            <History className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="hidden sm:inline">{t('contracts.history')}</span>
          </button>
          <button className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95">
             <Filter className="w-5 h-5" />
             {t('contracts.filters')}
          </button>
        </div>
      </header>

      {/* Modern Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
           <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder={t('contracts.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm"
              />
           </div>
           <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 px-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              {t('contracts.count_label', { count: filteredContracts.length })}
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/20 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-6">{t('contracts.table.status_type')}</th>
                <th className="px-8 py-6 text-center">{t('contracts.table.ref')}</th>
                <th className="px-8 py-6">{t('contracts.table.employee')}</th>
                <th className="px-8 py-6">{t('contracts.table.employer')}</th>
                <th className="px-8 py-6">{t('contracts.table.period')}</th>
                <th className="px-8 py-6 text-right">{t('contracts.table.salary_basis')}</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredContracts.map((contract) => {
                const person = persons.find(p => p.id === contract.personId);
                const employer = employers.find(e => e.id === contract.employerId);
                const latestSnapshot = person?.snapshots[0];

                return (
                  <tr key={contract.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-400">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          contract.status === 'Actief' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {contract.status === 'Actief' ? t('contracts.table.active') : contract.status}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {contract.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className="font-mono text-[10px] font-black text-slate-300 dark:text-slate-600 group-hover:text-slate-400 transition-colors uppercase">
                          {contract.id}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-200">{latestSnapshot?.voornaam} {latestSnapshot?.familieNaam}</span>
                        <span className="text-xs text-slate-400 font-medium">{latestSnapshot?.inszNummer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                          {employer?.name}
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                       </span>
                    </td>
                    <td className="px-8 py-6 text-sm">
                      <div className="flex flex-col">
                         <span className="text-slate-600 dark:text-slate-300 font-bold flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {new Date(contract.startDate).toLocaleDateString('nl-BE')}
                         </span>
                         <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            {contract.endDate ? `${t('contracts.table.to')} ${new Date(contract.endDate).toLocaleDateString('nl-BE')}` : t('contracts.table.indeterminate')}
                         </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 font-black text-slate-900 dark:text-slate-100">
                             <Euro className="w-3 h-3 text-emerald-500" />
                             {contract.salaryBasis.toLocaleString('nl-BE')}
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                             {contract.type === 'Arbeider' ? t('contracts.table.per_hour') : t('contracts.table.per_month')}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-500 hover:text-white group/btn">
                          <ExternalLink className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
