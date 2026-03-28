import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Wallet2, Languages, Sun, Moon, ChevronDown, FileText, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider';
import { useEmployer } from '../components/EmployerProvider';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { currentEmployer, setCurrentEmployer, allEmployers } = useEmployer();

  const toggleLanguage = () => {
    const next = i18n.language.startsWith('nl') ? 'fr' : i18n.language.startsWith('fr') ? 'en' : 'nl';
    i18n.changeLanguage(next);
  };

  const menuItems = [
    { to: '/', icon: LayoutDashboard, label: t('navigation.home') },
    { to: '/persons', icon: Users, label: t('navigation.persons') },
    { to: '/employers', icon: Building2, label: t('navigation.employers') },
    { to: '/contracts', icon: FileText, label: t('navigation.contracts') },
    { to: '/payroll', icon: Wallet2, label: t('navigation.payroll') },
    { to: '/messages', icon: Zap, label: 'Message Queue' },
  ];

  return (
    <aside className="w-64 bg-card border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-50">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">PRATO</span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2 block">
          {t('sidebar.active_employer')}
        </label>
        <div className="relative group">
          <select
            value={currentEmployer?.id || ''}
            onChange={(e) => {
              const emp = allEmployers.find(a => a.id === e.target.value);
              setCurrentEmployer(emp || null);
            }}
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-700 dark:text-slate-300 pr-10"
          >
            <option value="" disabled>{t('sidebar.select_employer')}</option>
            {allEmployers.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors" />
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-100 dark:border-emerald-900/50 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
        >
          <Languages className="w-5 h-5" />
          <span className="uppercase font-medium">{i18n.language.split('-')[0]}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          <span>{theme === 'dark' ? t('theme.light') : t('theme.dark')}</span>
        </button>
      </div>
    </aside>
  );
}
