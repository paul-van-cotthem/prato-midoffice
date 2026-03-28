import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Users, FileText, AlertCircle, Plus, Save } from 'lucide-react';
import MainLayout from './layouts/MainLayout';
import Persons from './pages/Persons';
import Employers from './pages/Employers';
import Contracts from './pages/Contracts';
import AddSnapshot from './pages/AddSnapshot';
import Payroll from './pages/Payroll';
import MessageQueue from './pages/MessageQueue';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { DataProvider, useData } from './components/DataProvider';
import SlideDrawer from './components/SlideDrawer';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

function Dashboard() {
  const { t } = useTranslation();
  const { persons, contracts, payrollRuns, addPerson } = useData();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({ firstName: '', lastName: '', insz: '' });

  const stats = [
    { 
      label: t('dashboard.active_workers') || 'Actieve Medewerkers', 
      value: persons.length.toString(), 
      icon: Users, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/30' 
    },
    { 
      label: t('dashboard.active_contracts') || 'Lopende Contracten', 
      value: contracts.filter(c => c.status === 'Actief').length.toString(), 
      icon: FileText, 
      color: 'text-indigo-500', 
      bg: 'bg-indigo-50 dark:bg-indigo-950/30' 
    },
    { 
      label: t('dashboard.pending_payroll') || 'Loonverwerkingen', 
      value: payrollRuns.length.toString(), 
      icon: AlertCircle, 
      color: 'text-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-950/30' 
    },
  ];

  const recentMessages = [
    { id: 1, type: 'success', title: t('dashboard.messages.snapshot_processed.title'), detail: t('dashboard.messages.snapshot_processed.detail'), time: '2m geleden' },
    { id: 2, type: 'warning', title: t('dashboard.messages.validation_error.title'), detail: t('dashboard.messages.validation_error.detail'), time: '15m geleden' },
    { id: 3, type: 'success', title: t('dashboard.messages.calculation_completed.title'), detail: t('dashboard.messages.calculation_completed.detail'), time: '1u geleden' },
  ];

  const handleCreatePerson = () => {
    if (!newPerson.firstName || !newPerson.lastName) return;
    
    const personId = `PERS-${Date.now().toString().slice(-6)}`;
    
    addPerson({
      id: personId,
      werkgeverId: 'emp-001', // Default link to first employer
      snapshots: [{
        aanvangsDatum: new Date().toISOString().split('T')[0],
        inszNummer: newPerson.insz || '00.00.00-000.00',
        familieNaam: newPerson.lastName,
        voornaam: newPerson.firstName,
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

    setNewPerson({ firstName: '', lastName: '', insz: '' });
    setIsDrawerOpen(false);
    // Navigate to the newly created person's snapshot page to complete details
    navigate(`/person/${personId}/add-snapshot`);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          {t('dashboard.title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
          {t('dashboard.welcome_subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-8 bg-card border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black">{stat.value}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold px-1 flex items-center gap-2 text-slate-900 dark:text-slate-100 uppercase tracking-tight">
            <Plus className="w-5 h-5 text-emerald-500" />
            {t('dashboard.quick_actions')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-between p-7 bg-emerald-500 text-white rounded-[2rem] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 group cursor-pointer border-b-4 border-emerald-700 active:translate-y-1"
            >
              <span className="font-black text-lg uppercase tracking-tight">{t('dashboard.new_person')}</span>
              <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/payroll')}
              className="flex items-center justify-between p-7 bg-card border border-slate-200 dark:border-slate-800 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-black text-lg uppercase tracking-tight cursor-pointer shadow-sm hover:shadow-md group"
            >
              <span>{t('dashboard.start_payroll')}</span>
              <FileText className="w-7 h-7 text-emerald-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold px-1 flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <AlertCircle className="w-5 h-5 text-emerald-500" />
            {t('dashboard.feed_title')}
          </h2>
          <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-3xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                    msg.type === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                  }`}>
                    {msg.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{msg.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {msg.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={t('dashboard.new_person')}
        description="Voeg snel een nieuw personeelslid toe aan de midoffice."
        footer={
          <div className="flex gap-4">
            <button 
              onClick={handleCreatePerson}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Voornaam</label>
              <input 
                type="text" 
                value={newPerson.firstName}
                onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                placeholder="bv. Dirk"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Naam</label>
              <input 
                type="text" 
                value={newPerson.lastName}
                onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" 
                placeholder="bv. Janssens"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">INSZ / Rijksregisternummer</label>
            <input 
              type="text" 
              value={newPerson.insz}
              onChange={(e) => setNewPerson({ ...newPerson, insz: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono" 
              placeholder="00.00.00-000.00"
            />
          </div>
        </div>
      </SlideDrawer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="persons" element={<Persons />} />
              <Route path="employers" element={<Employers />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="person/:id/add-snapshot" element={<AddSnapshot />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="messages" element={<MessageQueue />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
