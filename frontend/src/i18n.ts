import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  nl: {
    translation: {
      "common": {
        "search": "Zoeken...",
        "save": "Opslaan",
        "cancel": "Annuleren",
        "delete": "Verwijderen",
        "edit": "Bewerken",
        "loading": "Laden...",
        "processing": "Verwerken...",
        "error": "Fout",
        "success": "Succes"
      },
      "dashboard": {
        "title": "Prato Mid-office",
        "welcome_subtitle": "Welkom terug. Hier is een overzicht van de huidige midoffice status.",
        "pending_payroll": "Te berekenen lonen",
        "alerts": "Dringende meldingen",
        "active_contracts": "Actieve contracten",
        "quick_actions": "Snelkoppelingen",
        "new_person": "Nieuwe Persoon",
        "start_payroll": "Start Loonverwerking",
        "search_employer": "Zoek Werkgever",
        "feed_title": "Live Messaging Feed (Earnie)",
        "messages": {
          "snapshot_processed": { "title": "Snapshot Verwerkt", "detail": "Persoon succesvol gesynchroniseerd met Earnie." },
          "validation_error": { "title": "Validatie Fout", "detail": "INSZ nummer bevat ongeldige karakters." },
          "calculation_completed": { "title": "Calculatie Voltooid", "detail": "Payroll run succesvol afgerond." }
        }
      },
      "navigation": {
        "home": "Dashboard",
        "persons": "Personen",
        "employers": "Werkgevers",
        "contracts": "Contracten",
        "payroll": "Lonen"
      },
      "theme": {
        "light": "Lichte modus",
        "dark": "Donkere modus"
      },
      "login": {
        "hub_title": "Mid-Office Control Hub",
        "email_label": "E-mailadres",
        "email_placeholder": "naam@prato.be",
        "password_label": "Wachtwoord",
        "forgot_password": "Vergeten?",
        "submit": "Aanmelden",
        "error_invalid": "Ongeldige inloggegevens. Controleer uw e-mail en wachtwoord.",
        "footer": "v3.30.3"
      },
      "sidebar": {
        "active_employer": "Actieve Werkgever",
        "select_employer": "Selecteer werkgever..."
      },
      "wizard": {
        "title": "Snapshot Manager",
        "subtitle": "Nieuwe historiek voor",
        "step": "Stap",
        "next": "Volgende Stap",
        "prev": "Vorige",
        "submit": "Indienen & Synchroniseren",
        "steps": {
          "1": { "name": "Basis", "desc": "Personalia & Contact", "title": "Basis Informatie", "sub": "De fundamentele identificatiegegevens voor de loonverwerking." },
          "2": { "name": "Adres & Bank", "desc": "Domicilie & Rekening", "title": "Adres & Betaalgegevens", "sub": "Domicilie-adres en het rekeningnummer voor de loonstorting." },
          "3": { "name": "Fiscaal", "desc": "Lasten & Belasting", "title": "Fiscale Situatie & Gezinslast", "sub": "Parameters die de bedrijfsvoorheffing en belastingvrije som bepalen." },
          "4": { "name": "Review", "desc": "Controle & Verzenden", "title": "Klaar voor Sync?", "sub": "Controleer het dossier nauwkeurig voor verzending naar de loonmotor." }
        },
        "fields": {
          "lastname": "Familienaam",
          "firstname": "Voornaam",
          "insz": "INSZ Nummer",
          "email_slip": "Email Loonbrief",
          "language_pref": "Taalvoorkeur",
          "gender": "Geslacht",
          "street": "Straat",
          "nr": "Nr",
          "bus": "Bus",
          "postal": "Postcode",
          "city": "Gemeente",
          "bank_info": "Bankgegevens",
          "iban": "IBAN (Belgisch)",
          "bic": "BIC Code",
          "civil_status": "Burgerlijke Staat",
          "disabled": "Mindervaliditeit",
          "disabled_sub": "Persoon heeft een erkende handicap",
          "dependents": "Personen ten laste",
          "children": "Kinderen ten laste",
          "children_disabled": "Hiervan mindervalide"
        },
        "review": {
          "full_name": "Volledige Naam",
          "rrn": "Rijksregister (INSZ)",
          "address": "Domicilie-adres",
          "payment": "Betaalmethode",
          "not_configured": "Niet geconfigureerd",
          "important": "Belangrijk",
          "sync_warning": "Deze data wordt direct gesynchroniseerd met Earnie. Onjuiste data kan leiden tot foutieve loonberekeningen."
        },
        "options": {
          "lang_nl": "Vlaams (NL)",
          "lang_fr": "Frans (FR)",
          "male": "Man",
          "female": "Vrouw",
          "other": "X (Andere)",
          "status_single": "Ongehuwd (Vrijgezel)",
          "status_married": "Gehuwd",
          "status_cohabiting": "Wettelijk Samenwonend",
          "status_widow": "Weduwnaar / Weduwe",
          "status_divorced": "Gescheiden"
        }
      },
      "persons": {
        "no_employer_title": "Geen werkgever geselecteerd",
        "no_employer_subtitle": "Selecteer eerst een werkgever in de sidebar om de personenlijst te bekijken.",
        "subtitle": "Overzicht van alle personen voor",
        "search_placeholder": "Zoek op naam of INSZ...",
        "data_incomplete": "Data Onvolledig",
        "snapshots_count": "Snapshot(s)",
        "no_results": "Geen personen gevonden voor deze selectie."
      },
      "employers": {
        "title": "Werkgevers",
        "subtitle": "Beheer de aangesloten bedrijven en hun medewerkers.",
        "new_button": "Nieuwe Werkgever",
        "search": "Zoek op naam, BTW of sector...",
        "stats": {
          "total": "Totaal Werkgevers",
          "active_staff": "Actieve Medewerkers",
          "sectors": "Sectoren"
        },
        "active_count": "{{count}} actieve medewerkers",
        "validated": "Gevalideerd"
      },
      "contracts": {
        "title": "Contracten",
        "subtitle": "Overzicht van alle actieve en historische werkovereenkomsten.",
        "history": "Historiek",
        "filters": "Filters",
        "search": "Zoek op contract ID of werknemer...",
        "count_label": "{{count}} Contracten getoond",
        "table": {
          "status_type": "Status / Type",
          "ref": "Referentie",
          "employee": "Medewerker",
          "employer": "Werkgever",
          "period": "Periode",
          "salary_basis": "Basisloon",
          "active": "Actief",
          "indeterminate": "ONBEPAALDE DUUR",
          "to": "tot",
          "per_hour": "Per Uur",
          "per_month": "Per Maand"
        }
      },
      "payroll": {
        "title": "Looncontrole",
        "subtitle": "Beheer en controleer de loonruns van de Earnie engine.",
        "search": "Zoek loonrun...",
        "table": {
          "period_run": "Periode & Run",
          "employer": "Werkgever",
          "calculations": "Calculaties",
          "total_net": "Totaal Netto",
          "status": "Status"
        },
        "drilldown_title": "Calculaties voor",
        "detail": {
          "title": "Loonberekening Detail",
          "engine_error": "Engine Foutmelding",
          "action_required": "Actie: Controleer de snapshot data en herbereken.",
          "bruto": "Bruto",
          "netto": "Netto",
          "deductions": "Afhoudingen",
          "net_salary": "Netto Salaris",
          "breakdown": "Looncomponenten Breakdown",
          "close": "Sluiten",
          "generate": "Loonstrook Genereren"
        }
      }
    }
  },
  "fr": {
    "translation": {
      "common": {
        "search": "Rechercher...",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "delete": "Supprimer",
        "edit": "Modifier",
        "loading": "Chargement...",
        "processing": "Traitement...",
        "error": "Erreur",
        "success": "Succès"
      },
      "dashboard": {
        "title": "Prato Mid-office",
        "welcome_subtitle": "Bon retour. Voici un aperçu de l'état actuel du back-office.",
        "pending_payroll": "Salaires à calculer",
        "alerts": "Alertes urgentes",
        "active_contracts": "Contrats actifs",
        "quick_actions": "Actions rapides",
        "new_person": "Nouvelle Personne",
        "start_payroll": "Lancer le calcul",
        "search_employer": "Chercher Employeur",
        "feed_title": "F flux de messages en direct (Earnie)",
        "messages": {
          "snapshot_processed": { "title": "Snapshot Traité", "detail": "Personne synchronisée avec succès avec Earnie." },
          "validation_error": { "title": "Erreur de Validation", "detail": "Le numéro NISS contient des caractères invalides." },
          "calculation_completed": { "title": "Calcul Terminé", "detail": "Exécution de la paie terminée avec succès." }
        }
      },
      "navigation": {
        "home": "Tableau de bord",
        "persons": "Personnes",
        "employers": "Employeurs",
        "contracts": "Contrats",
        "payroll": "Salaires"
      },
      "theme": {
        "light": "Mode clair",
        "dark": "Mode sombre"
      },
      "login": {
        "hub_title": "Plateforme de Contrôle Mid-Office",
        "email_label": "Adresse e-mail",
        "email_placeholder": "nom@prato.be",
        "password_label": "Mot de passe",
        "forgot_password": "Oublié ?",
        "submit": "Se connecter",
        "error_invalid": "Identifiants invalides. Veuillez vérifier votre e-mail et mot de passe.",
        "footer": "v3.30.3"
      },
      "sidebar": {
        "active_employer": "Employeur Actif",
        "select_employer": "Sélectionner employeur..."
      },
      "wizard": {
        "title": "Gestionnaire de Snapshots",
        "subtitle": "Nouvel historique pour",
        "step": "Étape",
        "next": "Étape Suivante",
        "prev": "Précédent",
        "submit": "Soumettre & Synchroniser",
        "steps": {
          "1": { "name": "Base", "desc": "Infos & Contact", "title": "Informations de Base", "sub": "Données d'identification fondamentales pour la paie." },
          "2": { "name": "Adresse & Banque", "desc": "Domicile & Compte", "title": "Adresse & Coordonnées Bancaires", "sub": "Adresse du domicile et numéro de compte pour le virement." },
          "3": { "name": "Fiscal", "desc": "Charges & Impôts", "title": "Situation Fiscale & Personnes à Charge", "sub": "Paramètres déterminant le précompte professionnel." },
          "4": { "name": "Révision", "desc": "Contrôle & Envoi", "title": "Prêt pour Sync ?", "sub": "Veuillez vérifier attentivement le dossier avant l'envoi au moteur." }
        },
        "fields": {
          "lastname": "Nom de famille",
          "firstname": "Prénom",
          "insz": "Numéro NISS",
          "email_slip": "E-mail pour fiche de paie",
          "language_pref": "Préférence linguistique",
          "gender": "Sexe",
          "street": "Rue",
          "nr": "N°",
          "bus": "Bte",
          "postal": "Code postal",
          "city": "Commune",
          "bank_info": "Données bancaires",
          "iban": "IBAN (Belge)",
          "bic": "Code BIC",
          "civil_status": "État civil",
          "disabled": "Invalidité",
          "disabled_sub": "La personne a un handicap reconnu",
          "dependents": "Personnes à charge",
          "children": "Enfants à charge",
          "children_disabled": "Dont handicapés"
        },
        "review": {
          "full_name": "Nom Complet",
          "rrn": "Numéro de Registre National",
          "address": "Adresse du domicile",
          "payment": "Méthode de paiement",
          "not_configured": "Non configuré",
          "important": "Important",
          "sync_warning": "Ces données seront synchronisées avec Earnie. Des données erronées peuvent entraîner des calculs de paie incorrects."
        },
        "options": {
          "lang_nl": "Néerlandais (NL)",
          "lang_fr": "Français (FR)",
          "male": "Homme",
          "female": "Femme",
          "other": "X (Autre)",
          "status_single": "Célibataire",
          "status_married": "Marié(e)",
          "status_cohabiting": "Cohabitation légale",
          "status_widow": "Veuf / Veuve",
          "status_divorced": "Divorcé(e)"
        }
      },
      "persons": {
        "no_employer_title": "Aucun employeur sélectionné",
        "no_employer_subtitle": "Veuillez d'abord sélectionner un employeur dans la barre latérale om te begijnden.",
        "subtitle": "Aperçu de toutes les personnes pour",
        "search_placeholder": "Chercher par nom ou NISS...",
        "data_incomplete": "Données Incomplètes",
        "snapshots_count": "Snapshot(s)",
        "no_results": "Aucune personne trouvée voor deze selectie."
      },
      "employers": {
        "title": "Employeurs",
        "subtitle": "Gérez les entreprises affiliées et leur personnel.",
        "new_button": "Nouvel Employeur",
        "search": "Rechercher par nom, TVA ou secteur...",
        "stats": {
          "total": "Total Employeurs",
          "active_staff": "Personnel Actif",
          "sectors": "Secteurs"
        },
        "active_count": "{{count}} employés actifs",
        "validated": "Validé"
      },
      "contracts": {
        "title": "Contrats",
        "subtitle": "Aperçu de tous les contrats de travail actifs et historiques.",
        "history": "Historique",
        "filters": "Filtres",
        "search": "Chercher par ID contrat ou employé...",
        "count_label": "{{count}} Contrats affichés",
        "table": {
          "status_type": "Statut / Type",
          "ref": "Référence",
          "employee": "Employé",
          "employer": "Employeur",
          "period": "Période",
          "salary_basis": "Salaire de base",
          "active": "Actif",
          "indeterminate": "DURÉE INDÉTERMINÉE",
          "to": "jusqu'à",
          "per_hour": "Par Heure",
          "per_month": "Par Mois"
        }
      },
      "payroll": {
        "title": "Contrôle de Paie",
        "subtitle": "Gérez et vérifiez les calculs du moteur Earnie.",
        "search": "Chercher une exécution...",
        "table": {
          "period_run": "Période & Exécution",
          "employer": "Employeur",
          "calculations": "Calculs",
          "total_net": "Total Net",
          "status": "Statut"
        },
        "drilldown_title": "Calculs pour",
        "detail": {
          "title": "Détail du Calcul",
          "engine_error": "Erreur du Moteur",
          "action_required": "Action : Vérifiez les snapshots et recalculez.",
          "bruto": "Brut",
          "netto": "Net",
          "deductions": "Déductions",
          "net_salary": "Salaire Net",
          "breakdown": "Détail des Composantes",
          "close": "Fermer",
          "generate": "Générer Fiche de Paie"
        }
      }
    }
  },
  "en": {
    "translation": {
      "common": {
        "search": "Search...",
        "save": "Save",
        "cancel": "Cancel",
        "delete": "Delete",
        "edit": "Edit",
        "loading": "Loading...",
        "processing": "Processing...",
        "error": "Error",
        "success": "Success"
      },
      "dashboard": {
        "title": "Prato Mid-office",
        "welcome_subtitle": "Welcome back. Here is an overview of the current midoffice status.",
        "pending_payroll": "Pending payrolls",
        "alerts": "Urgent alerts",
        "active_contracts": "Active contracts",
        "quick_actions": "Quick actions",
        "new_person": "New Person",
        "start_payroll": "Start Payroll",
        "search_employer": "Search Employer",
        "feed_title": "Live Messaging Feed (Earnie)",
        "messages": {
          "snapshot_processed": { "title": "Snapshot Processed", "detail": "Person successfully synced with Earnie." },
          "validation_error": { "title": "Validation Error", "detail": "National Registry number contains invalid characters." },
          "calculation_completed": { "title": "Calculation Completed", "detail": "Payroll run completed successfully." }
        }
      },
      "navigation": {
        "home": "Dashboard",
        "persons": "Persons",
        "employers": "Employers",
        "contracts": "Contracts",
        "payroll": "Payroll"
      },
      "theme": {
        "light": "Light mode",
        "dark": "Dark mode"
      },
      "login": {
        "hub_title": "Mid-Office Control Hub",
        "email_label": "Email Address",
        "email_placeholder": "name@prato.be",
        "password_label": "Password",
        "forgot_password": "Forgot?",
        "submit": "Login",
        "error_invalid": "Invalid credentials. Please check your email and password.",
        "footer": "v3.30.3"
      },
      "sidebar": {
        "active_employer": "Active Employer",
        "select_employer": "Select employer..."
      },
      "wizard": {
        "title": "Snapshot Manager",
        "subtitle": "New history for",
        "step": "Step",
        "next": "Next Step",
        "prev": "Previous",
        "submit": "Submit & Sync",
        "steps": {
          "1": { "name": "Basic", "desc": "Personal & Contact", "title": "Basic Information", "sub": "Core identification data for payroll processing." },
          "2": { "name": "Address & Bank", "desc": "Address & Account", "title": "Address & Payment Details", "sub": "Domicile address and bank account for payment." },
          "3": { "name": "Fiscal", "desc": "Taxes & Dependents", "title": "Fiscal Status & Dependents", "sub": "Parameters determining professional withholding tax." },
          "4": { "name": "Review", "desc": "Audit & Submit", "title": "Ready to Sync?", "sub": "Please audit the file carefully before sending to the engine." }
        },
        "fields": {
          "lastname": "Last Name",
          "firstname": "First Name",
          "insz": "National Registry No.",
          "email_slip": "Payslip Email",
          "language_pref": "Preferred Language",
          "gender": "Gender",
          "street": "Street",
          "nr": "No.",
          "bus": "Box",
          "postal": "Postal Code",
          "city": "City",
          "bank_info": "Bank Account Details",
          "iban": "IBAN (Belgian)",
          "bic": "BIC Code",
          "civil_status": "Civil Status",
          "disabled": "Disability",
          "disabled_sub": "Person has a recognized disability",
          "dependents": "Dependents",
          "children": "Dependent Children",
          "children_disabled": "Of which disabled"
        },
        "review": {
          "full_name": "Full Name",
          "rrn": "National Registry Number",
          "address": "Home Address",
          "payment": "Payment Method",
          "not_configured": "Not configured",
          "important": "Important",
          "sync_warning": "This data will be synced directly with Earnie. Incorrect data may lead to faulty payroll calculations."
        },
        "options": {
          "lang_nl": "Dutch (NL)",
          "lang_fr": "French (FR)",
          "male": "Male",
          "female": "Female",
          "other": "X (Other)",
          "status_single": "Single",
          "status_married": "Married",
          "status_cohabiting": "Legal Cohabitation",
          "status_widow": "Widowed",
          "status_divorced": "Divorced"
        }
      },
      "persons": {
        "no_employer_title": "No employer selected",
        "no_employer_subtitle": "Please select an employer in the sidebar to view the person list.",
        "subtitle": "Overview of all persons for",
        "search_placeholder": "Search name or RRN...",
        "data_incomplete": "Data Incomplete",
        "snapshots_count": "Snapshot(s)",
        "no_results": "No persons found for this selection."
      },
      "employers": {
        "title": "Employers",
        "subtitle": "Manage affiliated companies and their staff.",
        "new_button": "New Employer",
        "search": "Search by name, VAT or sector...",
        "stats": {
          "total": "Total Employers",
          "active_staff": "Active Staff",
          "sectors": "Sectors"
        },
        "active_count": "{{count}} active employees",
        "validated": "Validated"
      },
      "contracts": {
        "title": "Contracts",
        "subtitle": "Overview of all active and historical employment contracts.",
        "history": "History",
        "filters": "Filters",
        "search": "Search by contract ID or employee...",
        "count_label": "{{count}} Contracts shown",
        "table": {
          "status_type": "Status / Type",
          "ref": "Reference",
          "employee": "Employee",
          "employer": "Employer",
          "period": "Period",
          "salary_basis": "Salary Basis",
          "active": "Active",
          "indeterminate": "INDETERMINATE DURATION",
          "to": "to",
          "per_hour": "Per Hour",
          "per_month": "Per Month"
        }
      },
      "payroll": {
        "title": "Payroll Control",
        "subtitle": "Manage and verify Earnie engine calculation runs.",
        "search": "Search run...",
        "table": {
          "period_run": "Period & Run",
          "employer": "Employer",
          "calculations": "Calculations",
          "total_net": "Total Net",
          "status": "Status"
        },
        "drilldown_title": "Calculations for",
        "detail": {
          "title": "Calculation Detail",
          "engine_error": "Engine Feedback",
          "action_required": "Action: Verify snapshot data and recalculate.",
          "bruto": "Gross",
          "netto": "Net",
          "deductions": "Deductions",
          "net_salary": "Net Salary",
          "breakdown": "Salary Component Breakdown",
          "close": "Close",
          "generate": "Generate Payslip"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nl',
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
