import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search,
  ArrowUpRight,
  Info,
  X,
  Plus
} from 'lucide-react';
import { useData } from '../components/DataProvider';
import { MOCK_CALCULATIONS } from '../mocks/db';
import type { SalaryCalculation } from '../mocks/db';

export default function Payroll() {
  const { t } = useTranslation();
  const { payrollRuns, employers, persons, addPayrollRun } = useData();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [selectedCalc, setSelectedCalc] = useState<SalaryCalculation | null>(null);
  
  const runs = payrollRuns;
  const selectedRun = runs.find(r => r.id === selectedRunId);
  const calculations = selectedRunId ? MOCK_CALCULATIONS.filter(c => c.runId === selectedRunId) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'Error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'Processing': return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      default: return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'Error': return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50';
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {t('payroll.title')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
            {t('payroll.subtitle')}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const newRunId = `RUN-${Date.now().toString().slice(-6)}`;
              addPayrollRun({
                id: newRunId,
                employerId: 'emp-001',
                period: new Date().toISOString().slice(0, 7),
                status: 'Processing',
                totalNet: 0,
                calculationCount: 0,
                errorCount: 0,
                createdAt: new Date().toISOString()
              });
              setSelectedRunId(newRunId);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Nieuwe Run
          </button>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder={t('payroll.search')} 
              className="bg-card border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all w-64 font-medium" 
            />
          </div>
          <button className="p-3 bg-card border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-600 dark:text-slate-400">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Runs Grid/Table */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('payroll.table.period_run')}</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('payroll.table.employer')}</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{t('payroll.table.calculations')}</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('payroll.table.total_net')}</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{t('payroll.table.status')}</th>
                <th className="px-8 py-6 sr-only">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {runs.map((run) => (
                <tr 
                  key={run.id} 
                  onClick={() => setSelectedRunId(run.id)}
                  className={`group cursor-pointer transition-all ${selectedRunId === run.id ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${getStatusStyle(run.status)}`}>
                        <FileText className="w-5 h-5 font-bold" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{run.period}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase">{run.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-700 dark:text-slate-300">
                      {employers.find(e => e.id === run.employerId)?.name || 'Onbekende Werkgever'}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <span className="text-sm font-bold">{run.calculationCount}</span>
                      {run.errorCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-md font-black">
                          {run.errorCount} ERR
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono font-bold text-slate-900 dark:text-slate-100">
                    € {run.status === 'Error' ? '---' : run.totalNet.toLocaleString('nl-BE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider ${getStatusStyle(run.status)}`}>
                      {getStatusIcon(run.status)}
                      {run.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <ChevronRight className={`w-6 h-6 text-slate-300 group-hover:text-emerald-500 transition-all ${selectedRunId === run.id ? 'rotate-90 text-emerald-500' : ''}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculations Drilldown */}
      {selectedRunId && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">
              {t('payroll.drilldown_title')} {selectedRun?.period} - {employers.find(e => e.id === selectedRun?.employerId)?.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculations.map((calc) => (
              <div 
                key={calc.id}
                onClick={() => setSelectedCalc(calc)}
                className={`p-6 bg-card border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden`}
              >
                {/* Status indicator bar */}
                <div className={`absolute top-0 left-0 w-full h-1.5 ${
                  calc.status === 'Success' ? 'bg-emerald-500' : 'bg-red-500'
                }`} />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-slate-500">
                      {calc.personId.split('-')[1]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {persons.find(p => p.id === calc.personId)?.snapshots[0].voornaam} {persons.find(p => p.id === calc.personId)?.snapshots[0].familieNaam}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{calc.id}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bruto</p>
                    <p className="text-lg font-bold">€ {calc.gross.toLocaleString('nl-BE')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Netto</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {calc.status === 'Error' ? t('common.error').toUpperCase() : `€ ${calc.net.toLocaleString('nl-BE')}`}
                    </p>
                  </div>
                </div>

                {calc.status === 'Error' && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 dark:text-red-400 font-bold line-clamp-2">
                      {calc.engineFeedback}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Salary Detail Modal */}
      {selectedCalc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
            <header className="px-8 py-8 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
                  <FileText className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">{t('payroll.detail.title')}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                    {persons.find(p => p.id === selectedCalc.personId)?.snapshots[0].voornaam} {persons.find(p => p.id === selectedCalc.personId)?.snapshots[0].familieNaam}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCalc(null)}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </header>

            <div className="p-10 space-y-10">
              {selectedCalc.status === 'Error' ? (
                <div className="p-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3 text-red-700 dark:text-red-400">
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-black uppercase tracking-widest text-sm text-red-600 dark:text-emerald-400">{t('payroll.detail.engine_error')}</span>
                  </div>
                  <p className="text-red-800 dark:text-red-300 font-medium leading-relaxed italic bg-white/50 dark:bg-black/20 p-4 rounded-xl">
                    "{selectedCalc.engineFeedback}"
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-widest">{t('payroll.detail.action_required')}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('payroll.detail.bruto')}</p>
                      <p className="text-2xl font-black">€ {selectedCalc.gross.toLocaleString('nl-BE')}</p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('payroll.detail.deductions')}</p>
                      <p className="text-2xl font-black text-red-500">€ {(selectedCalc.taxes + selectedCalc.socialSecurity).toLocaleString('nl-BE', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-6 bg-emerald-500 rounded-3xl shadow-xl shadow-emerald-500/20 space-y-2 group">
                      <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">{t('payroll.detail.net_salary')}</p>
                      <p className="text-2xl font-black text-white group-hover:scale-105 transition-transform origin-left">€ {selectedCalc.net.toLocaleString('nl-BE', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-4 h-4 text-emerald-500" />
                      {t('payroll.detail.breakdown')}
                    </h4>
                    <div className="space-y-3">
                      {selectedCalc.components.map((comp, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-colors">
                          <span className="font-bold text-slate-700 dark:text-slate-300">{comp.label}</span>
                          <span className={`font-mono font-bold ${comp.type === 'plus' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {comp.type === 'plus' ? '+' : '-'} € {comp.amount.toLocaleString('nl-BE', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <footer className="px-10 py-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
              <button 
                onClick={() => setSelectedCalc(null)}
                className="px-8 py-4 font-black uppercase text-xs tracking-widest text-slate-500 hover:text-slate-700 transition-colors"
              >
                {t('payroll.detail.close')}
              </button>
              {selectedCalc.status !== 'Error' && (
                <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95">
                  {t('payroll.detail.generate')}
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
