import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Users, 
  Settings, 
  Check, 
  AlertCircle,
  Save,
  Loader2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useData } from '../components/DataProvider';
import { api } from '../utils/api';
import type { PersoonSnapshot } from '../mocks/db';

const snapshotSchema = z.object({
  voornaam: z.string().min(2, 'Voornaam is verplicht'),
  familieNaam: z.string().min(2, 'Familienaam is verplicht'),
  inszNummer: z.string().regex(/^\d{2}\.\d{2}\.\d{2}-\d{3}\.\d{2}$/, 'Ongeldig INSZ formaat (XX.XX.XX-XXX.XX)'),
  geslacht: z.enum(['Man', 'Vrouw', 'X']),
  geboorteDatum: z.string().optional(),
  geboortePlaats: z.string().optional(),
  straat: z.string().min(2, 'Straat is verplicht'),
  huisnummer: z.string().min(1, 'Huisnummer is verplicht'),
  bus: z.string().optional(),
  postCode: z.string().min(4, 'Postcode is verplicht'),
  gemeente: z.string().min(2, 'Gemeente is verplicht'),
  land: z.string().min(2, 'Land is verplicht'),
  iban: z.string().min(14, 'Ongeldig IBAN'),
  bic: z.string().min(8, 'Ongeldig BIC'),
  taal: z.enum(['Nederlands', 'Frans']),
  emailLoonbrief: z.string().email('Ongeldig e-mailadres'),
  burgerlijkeStaat: z.enum(['Ongehuwd', 'Gehuwd', 'Samenwonend', 'Weduwnaar', 'Gescheiden']),
  aantalKinderenTenLaste: z.number().min(0).default(0),
  aantalMindervalideKinderenTenLaste: z.number().min(0).default(0),
  mindervalide: z.boolean().default(false),
  werknemerskengetallen: z.array(z.string()).default([]),
  aanvangsDatum: z.string()
});

type SnapshotFormValues = z.infer<typeof snapshotSchema>;

export default function AddSnapshot() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { persons, updatePerson } = useData();
  
  const person = useMemo(() => persons.find(p => p.id === id), [persons, id]);
  const initialSnapshot = person?.snapshots[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch
  } = useForm<SnapshotFormValues>({
    resolver: zodResolver(snapshotSchema) as any,
    defaultValues: initialSnapshot ? {
      ...initialSnapshot,
      aanvangsDatum: new Date().toISOString().split('T')[0]
    } : {
      aanvangsDatum: new Date().toISOString().split('T')[0],
      geslacht: 'Man',
      taal: 'Nederlands',
      burgerlijkeStaat: 'Ongehuwd',
      land: 'België',
      aantalKinderenTenLaste: 0,
      aantalMindervalideKinderenTenLaste: 0,
      mindervalide: false,
      werknemerskengetallen: []
    }
  });

  const onSubmit = async (data: SnapshotFormValues) => {
    if (!id || !person) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Backend sync attempt
      const response = await api.savePersonSnapshot(id, data);
      
      // 2. Always persist locally
      const updatedSnapshots = [data as PersoonSnapshot, ...person.snapshots];
      updatePerson(id, { snapshots: updatedSnapshots });

      if (response.error) {
        console.warn('Backend sync failed, saved locally:', response.error);
        setSubmitError(t('wizard.feedback.saved_locally_warning') || 'Data lokaal opgeslagen. Backend synchronisatie mislukt.');
      }

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/persons');
      }, 2000);
    } catch (err) {
      setSubmitError(t('wizard.feedback.error') || 'Er is een fout opgetreden bij het opslaan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof SnapshotFormValues)[] = [];
    if (currentStep === 1) fieldsToValidate = ['voornaam', 'familieNaam', 'inszNummer', 'geslacht'];
    if (currentStep === 2) fieldsToValidate = ['straat', 'huisnummer', 'postCode', 'gemeente', 'land'];
    if (currentStep === 3) fieldsToValidate = ['iban', 'bic', 'taal', 'emailLoonbrief'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  if (!person) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50">{t('wizard.error.person_not_found')}</h2>
        <button onClick={() => navigate('/persons')} className="mt-4 text-emerald-500 font-bold hover:underline bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-xl">
          {t('common.back_to_overview')}
        </button>
      </div>
    );
  }

  const steps = [
    { id: 1, name: t('wizard.steps.identity'), icon: User },
    { id: 2, name: t('wizard.steps.address'), icon: MapPin },
    { id: 3, name: t('wizard.steps.payment'), icon: CreditCard },
    { id: 4, name: t('wizard.steps.family'), icon: Users },
    { id: 5, name: t('wizard.steps.fiscal'), icon: Settings },
  ];

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-28 h-28 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 rotate-12 transition-transform hover:rotate-0">
          <Check className="w-14 h-14 text-white" strokeWidth={3} />
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">
            {t('wizard.feedback.success_title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
            {t('wizard.feedback.success_message')}
          </p>
        </div>
        <div className="pt-8">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200 dark:border-emerald-800">
              {t('wizard.badge')}
            </span>
            <span className="text-slate-400 font-black text-xs uppercase tracking-tighter">/ {person.id}</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            {t('wizard.title_prefix')} {person.snapshots[0].voornaam} {person.snapshots[0].familieNaam}
          </h1>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-400">
            {currentStep}
          </div>
          <div className="pr-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('wizard.step_indicator')}</p>
             <p className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{steps[currentStep-1].name}</p>
          </div>
        </div>
      </header>

      {/* Modern Stepper */}
      <nav className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none translate-y-2">
        <ul className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <li key={step.id} className="relative z-10">
                <button
                  onClick={() => isCompleted && setCurrentStep(step.id)}
                  disabled={!isCompleted}
                  className={`flex flex-col items-center gap-3 transition-all duration-500 scale-90 md:scale-100 ${isCompleted ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${
                    isActive ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-emerald-500 shadow-2xl scale-110' : 
                    isCompleted ? 'bg-emerald-500 text-white border-white dark:border-slate-900' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-300'
                  }`}>
                    {isCompleted ? <Check className="w-7 h-7" strokeWidth={3} /> : <Icon className="w-6 h-6 outline-none" />}
                  </div>
                  <span className={`hidden md:block text-[10px] font-black uppercase tracking-widest ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-300'
                  }`}>
                    {step.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bg-card border border-slate-200 dark:border-slate-800 rounded-[3.5rem] shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 divide-y divide-slate-100 dark:divide-slate-800">
          
          <div className="p-10 md:p-16 flex-1">
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/30 rounded-2xl text-emerald-500">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">{t('wizard.steps.identity')}</h2>
                    <p className="text-slate-400 font-bold">{t('wizard.steps.identity_sub')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.first_name') || 'Voornaam'}</label>
                    <input {...register('voornaam')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-lg" />
                    {errors.voornaam && <p className="text-xs text-red-500 font-bold mt-1 ml-2">{errors.voornaam.message}</p>}
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.last_name') || 'Familienaam'}</label>
                    <input {...register('familieNaam')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-lg" />
                    {errors.familieNaam && <p className="text-xs text-red-500 font-bold mt-1 ml-2">{errors.familieNaam.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.insz') || 'INSZ Nummer'}</label>
                    <input {...register('inszNummer')} placeholder="85.01.01-123.87" className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-mono font-black text-xl text-emerald-600 dark:text-emerald-400" />
                    {errors.inszNummer && <p className="text-xs text-red-500 font-bold mt-1 ml-2">{errors.inszNummer.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.gender') || 'Geslacht'}</label>
                    <select {...register('geslacht')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold appearance-none bg-no-repeat bg-[right_1.5rem_center]">
                      <option value="Man">Man</option>
                      <option value="Vrouw">Vrouw</option>
                      <option value="X">X (Andere)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/30 rounded-2xl text-emerald-500">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">{t('wizard.steps.address') || 'Woonplaats'}</h2>
                    <p className="text-slate-400 font-bold">Adresgegevens voor verzending van documenten</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.street') || 'Straat'}</label>
                    <input {...register('straat')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.number') || 'Huisnummer'}</label>
                    <input {...register('huisnummer')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-center" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.postal_code') || 'Postcode'}</label>
                    <input {...register('postCode')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-black text-xl" />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.city') || 'Gemeente'}</label>
                    <input {...register('gemeente')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/30 rounded-2xl text-emerald-500">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">{t('wizard.steps.payment') || 'Betaling & Communicatie'}</h2>
                    <p className="text-slate-400 font-bold">Bankgegevens en verzendvoorkeuren</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">IBAN</label>
                    <input {...register('iban')} placeholder="BE00 0000 0000 0000" className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-mono font-black text-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Taalvoorkeur Documenten</label>
                    <select {...register('taal')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold">
                      <option value="Nederlands">Nederlands</option>
                      <option value="Frans">Frans (Français)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('wizard.form.email_payslip') || 'E-mail voor loonbrief'}</label>
                    <input {...register('emailLoonbrief')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Family */}
            {currentStep === 4 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/30 rounded-2xl text-emerald-500">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">{t('wizard.steps.family') || 'Gezinssituatie'}</h2>
                    <p className="text-slate-400 font-bold">Parameters voor de bedrijfsvoorheffing</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Burgerlijke Staat</label>
                    <select {...register('burgerlijkeStaat')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold">
                      <option value="Ongehuwd">Ongehuwd</option>
                      <option value="Gehuwd">Gehuwd</option>
                      <option value="Samenwonend">Samenwonend</option>
                      <option value="Gescheiden">Gescheiden</option>
                      <option value="Weduwnaar">Weduwnaar</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Kinderen ten laste</label>
                    <input type="number" {...register('aantalKinderenTenLaste', { valueAsNumber: true })} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-black text-2xl text-center" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Fiscal Review */}
            {currentStep === 5 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-slate-900 dark:bg-slate-50 rounded-2xl text-white dark:text-slate-900">
                    <Settings className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 uppercase tracking-tight">{t('wizard.steps.fiscal') || 'Controle & Bevestiging'}</h2>
                    <p className="text-slate-400 font-bold">Verifieer de gegevens voor u deze definitief toepast</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identiteit</p>
                      <p className="text-xl font-bold">{watch('voornaam')} {watch('familieNaam')}</p>
                      <p className="text-sm font-mono text-emerald-500 font-bold">{watch('inszNummer')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">IBAN Rekening</p>
                      <p className="text-xl font-mono font-bold">{watch('iban') || '---'}</p>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-3xl flex items-center gap-4 text-amber-700 dark:text-amber-400">
                      <AlertCircle className="w-6 h-6 shrink-0" />
                      <div>
                         <p className="font-black uppercase text-[10px] tracking-widest mb-1">Status Melding</p>
                         <p className="text-sm font-bold">{submitError}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Aanvangsdatum Dashboard</label>
                   <input type="date" {...register('aanvangsDatum')} className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-8 outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold" />
                </div>
              </div>
            )}

          </div>

          <footer className="p-10 md:p-12 bg-slate-50/50 dark:bg-slate-950/20 backdrop-blur-md flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-3 px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all border ${
                currentStep === 1 
                  ? 'border-transparent text-slate-200 dark:text-slate-800' 
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <ArrowLeft className="w-6 h-6" />
              {t('common.previous') || 'Vorige'}
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-4 px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all group border-4 border-slate-900 dark:border-white"
              >
                {t('common.next') || 'Volgende'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-4 px-14 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all shadow-2xl active:scale-95 border-b-8 ${
                  isSubmitting 
                    ? 'bg-slate-400 border-slate-500 text-slate-200' 
                    : 'bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t('common.processing') || 'Verwerken...'}
                  </>
                ) : (
                  <>
                    {t('common.save') || 'Snapshot Toepassen'}
                    <Save className="w-6 h-6" />
                  </>
                )}
              </button>
            )}
          </footer>
        </form>
      </div>
    </div>
  );
}
