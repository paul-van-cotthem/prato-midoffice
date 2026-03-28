import { Building2, Users, MapPin, Search, Plus, ExternalLink, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useData } from '../components/DataProvider';
import SlideDrawer from '../components/SlideDrawer';

export default function Employers() {
  const { t } = useTranslation();
  const { employers, addEmployer } = useData();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newEmployer, setNewEmployer] = useState({ name: '', vatNumber: '', sector: '', city: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployers = employers.filter(e => {
    const s = searchTerm.toLowerCase();
    return e.name.toLowerCase().includes(s) || 
           e.vatNumber.includes(s) || 
           e.sector.toLowerCase().includes(s);
  });

  const handleCreateEmployer = () => {
    if (!newEmployer.name || !newEmployer.vatNumber) return;

    addEmployer({
      id: `emp-${Math.random().toString(36).substr(2, 9)}`,
      name: newEmployer.name,
      vatNumber: newEmployer.vatNumber,
      sector: newEmployer.sector || 'Algemeen',
      address: {
        street: 'Onbekend',
        number: '0',
        city: newEmployer.city || 'Onbekend',
        postalCode: '0000'
      },
      activeEmployees: 0
    });

    setNewEmployer({ name: '', vatNumber: '', sector: '', city: '' });
    setIsDrawerOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50">{t('employers.title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t('employers.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 w-fit cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          {t('employers.new_button')}
        </button>
      </header>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{t('employers.stats.total')}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{employers.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{t('employers.stats.active_staff')}</p>
          <p className="text-3xl font-black text-emerald-500">{employers.reduce((acc, emp) => acc + emp.activeEmployees, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{t('employers.stats.sectors')}</p>
          <p className="text-3xl font-black text-blue-500">{new Set(employers.map(e => e.sector)).size}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
        <input 
          type="text" 
          placeholder={t('employers.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
        />
      </div>

      {/* Employers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployers.map((employer) => (
          <div 
            key={employer.id}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500 hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative space-y-6">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">
                  <Building2 className="w-8 h-8" />
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{employer.name}</h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1">{employer.sector}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{employer.address.city}, {employer.address.street} {employer.address.number}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {t('employers.active_count', { count: employer.activeEmployees })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  BTW: <span className="text-slate-600 dark:text-slate-300 ml-1">{employer.vatNumber}</span>
                </div>
                <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {t('employers.validated')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={t('employers.new_button')}
        description="Registreer een nieuwe werkgever in het systeem."
        footer={
          <div className="flex gap-4">
            <button 
              onClick={handleCreateEmployer}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Opslaan
            </button>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl transition-all"
            >
              Annuleren
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Bedrijfsnaam</label>
            <input 
              type="text" 
              value={newEmployer.name}
              onChange={(e) => setNewEmployer({ ...newEmployer, name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
              placeholder="bv. Prato Services"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">BTW Nummer</label>
            <input 
              type="text" 
              value={newEmployer.vatNumber}
              onChange={(e) => setNewEmployer({ ...newEmployer, vatNumber: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono" 
              placeholder="BE 0000.000.000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Sector</label>
              <input 
                type="text" 
                value={newEmployer.sector}
                onChange={(e) => setNewEmployer({ ...newEmployer, sector: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                placeholder="bv. HR Tech"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Stad</label>
              <input 
                type="text" 
                value={newEmployer.city}
                onChange={(e) => setNewEmployer({ ...newEmployer, city: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                placeholder="bv. Hasselt"
              />
            </div>
          </div>
        </div>
      </SlideDrawer>
    </div>
  );
}

