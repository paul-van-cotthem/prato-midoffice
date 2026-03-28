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
        "success": "Succes",
        "next": "Volgende Stap",
        "previous": "Vorige",
        "back_to_overview": "Terug naar overzicht",
        "close": "Sluiten"
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
        "payroll": "Lonen",
        "messages": "Berichtenwachtrij"
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
        "badge": "Nieuwe Snapshot",
        "title_prefix": "Dossier van",
        "subtitle": "Nieuwe historiek voor",
        "step_indicator": "Stap",
        "steps": {
          "identity": "Identiteit",
          "identity_sub": "De fundamentele identificatiegegevens voor de loonverwerking.",
          "address": "Adres & Bank",
          "address_sub": "Domicilie-adres en het rekeningnummer voor de loonstorting.",
          "payment": "Betaalgegevens",
          "payment_sub": "Gegevens voor de uitbetaling van het loon.",
          "family": "Gezinssituatie",
          "family_sub": "Parameters die de bedrijfsvoorheffing en belastingvrije som bepalen.",
          "fiscal": "Controle & Bevestiging",
          "fiscal_sub": "Controleer het dossier nauwkeurig voor verzending naar de loonmotor.",
          "review": { "name": "Review", "desc": "Controle & Verzenden", "title": "Klaar voor Sync?", "sub": "Controleer het dossier nauwkeurig voor verzending naar de loonmotor." }
        },
        "form": {
          "first_name": "Voornaam",
          "last_name": "Familienaam",
          "insz": "INSZ Nummer",
          "gender": "Geslacht",
          "street": "Straat",
          "number": "Nr",
          "postal_code": "Postcode",
          "city": "Gemeente",
          "email_payslip": "E-mail voor loonbrief"
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
        "feedback": {
          "success_title": "Snapshot Opgeslagen!",
          "success_message": "De nieuwe snapshot is succesvol verwerkt en gesynchroniseerd.",
          "error": "Er is een fout opgetreden bij het opslaan.",
          "saved_locally_warning": "Data lokaal opgeslagen, maar kon niet synchroniseren met Earnie."
        },
        "error": {
          "person_not_found": "Persoon niet gevonden"
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
      "message_queue": {
        "title": "Berichtenwachtrij",
        "subtitle": "Live monitor voor achtergrond-interfacing met Earnie Payroll Engine",
        "clear_queue": "Verwijder Wachtrij",
        "search_placeholder": "Zoek berichten...",
        "messages_count": "Berichten",
        "no_messages": "Geen berichten in de wachtrij",
        "no_messages_sub": "Voer een mutatie uit om een bericht te genereren",
        "json_payload": "JSON Payload",
        "copy_json": "Kopieer JSON",
        "status_log": "Status Log",
        "gen_msg_log": "Bericht succesvol gegenereerd uit mutatie hook.",
        "sent_msg_log": "Verzonden naar backend interfacing layer.",
        "proc_msg_log": "Bevestigd door Earnie Messaging Service.",
        "inspector_title": "Inspector",
        "inspector_desc": "Selecteer een bericht om de payload te analyseren"
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
        "success": "Succès",
        "next": "Étape Suivante",
        "previous": "Précédent",
        "back_to_overview": "Retour à l'aperçu",
        "close": "Fermer"
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
        "feed_title": "Flux de messages en direct (Earnie)",
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
        "payroll": "Salaires",
        "messages": "File de messages"
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
        "badge": "Nouveau Snapshot",
        "title_prefix": "Dossier de",
        "subtitle": "Nouvel historique pour",
        "step_indicator": "Étape",
        "steps": {
          "identity": "Identité",
          "identity_sub": "Données d'identification fondamentales pour la paie.",
          "address": "Adresse & Banque",
          "address_sub": "Adresse du domicile et numéro de compte pour le virement.",
          "payment": "Coordonnées Bancaires",
          "payment_sub": "Données pour le paiement du salaire.",
          "family": "Situation Fiscale",
          "family_sub": "Paramètres déterminant le précompte professionnel.",
          "fiscal": "Contrôle & Confirmation",
          "fiscal_sub": "Vérifiez attentivement le dossier avant l'envoi au moteur.",
          "review": { "name": "Révision", "desc": "Contrôle & Envoi", "title": "Prêt pour Sync ?", "sub": "Veuillez vérifier attentivement le dossier avant l'envoi au moteur." }
        },
        "form": {
          "first_name": "Prénom",
          "last_name": "Nom de famille",
          "insz": "Numéro NISS",
          "gender": "Sexe",
          "street": "Rue",
          "number": "N°",
          "postal_code": "Code postal",
          "city": "Commune",
          "email_payslip": "E-mail pour fiche de paie"
        },
        "feedback": {
          "success_title": "Snapshot Enregistré !",
          "success_message": "Le nouveau snapshot a été traité et synchronisé avec succès.",
          "error": "Une erreur est survenue lors de l'enregistrement.",
          "saved_locally_warning": "Données enregistrées localement, mais échec de synchronisation avec Earnie."
        },
        "error": {
          "person_not_found": "Personne non trouvée"
        }
      },
      "persons": {
        "no_employer_title": "Aucun employeur sélectionné",
        "no_employer_subtitle": "Veuillez d'abord sélectionner un employeur dans la barre latérale.",
        "subtitle": "Aperçu de toutes les personnes pour",
        "search_placeholder": "Chercher par nom ou NISS...",
        "data_incomplete": "Données Incomplètes",
        "snapshots_count": "Snapshot(s)",
        "no_results": "Aucune personne trouvée pour cette sélection."
      },
      "message_queue": {
        "title": "File de messages",
        "subtitle": "Monitor en direct pour l'interfaçage avec le moteur Earnie",
        "clear_queue": "Effacer la file",
        "search_placeholder": "Chercher messages...",
        "messages_count": "Messages",
        "no_messages": "Aucun message dans la file",
        "no_messages_sub": "Effectuez une mutation pour générer un message",
        "json_payload": "Payload JSON",
        "copy_json": "Copier le JSON",
        "status_log": "Log de statut",
        "gen_msg_log": "Message généré avec succès.",
        "sent_msg_log": "Envoyé à la couche d'interface backend.",
        "proc_msg_log": "Confirmé par le service de messagerie Earnie.",
        "inspector_title": "Inspecteur",
        "inspector_desc": "Sélectionnez un message pour analyser le payload"
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
        "success": "Success",
        "next": "Next Step",
        "previous": "Previous",
        "back_to_overview": "Back to overview",
        "close": "Close"
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
        "payroll": "Payroll",
        "messages": "Message Queue"
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
        "badge": "New Snapshot",
        "title_prefix": "File of",
        "subtitle": "New history for",
        "step_indicator": "Step",
        "steps": {
          "identity": "Identity",
          "identity_sub": "Core identification data for payroll processing.",
          "address": "Address & Bank",
          "address_sub": "Domicile address and bank account for payment.",
          "payment": "Payment Details",
          "payment_sub": "Data for salary disbursement.",
          "family": "Fiscal Status",
          "family_sub": "Parameters determining professional withholding tax.",
          "fiscal": "Audit & Submit",
          "fiscal_sub": "Please audit the file carefully before sending to the engine.",
          "review": { "name": "Review", "desc": "Audit & Submit", "title": "Ready to Sync?", "sub": "Please audit the file carefully before sending to the engine." }
        },
        "form": {
          "first_name": "First Name",
          "last_name": "Last Name",
          "insz": "National Registry No.",
          "gender": "Gender",
          "street": "Street",
          "number": "No.",
          "postal_code": "Postal Code",
          "city": "City",
          "email_payslip": "Payslip Email"
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
        "feedback": {
          "success_title": "Snapshot Saved!",
          "success_message": "The new snapshot has been successfully processed and synced.",
          "error": "An error occurred during save.",
          "saved_locally_warning": "Data saved locally, but failed to sync with Earnie."
        },
        "error": {
          "person_not_found": "Person not found"
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
      "message_queue": {
        "title": "Message Queue",
        "subtitle": "Live monitor for background interfacing with Earnie Payroll Engine",
        "clear_queue": "Clear Queue",
        "search_placeholder": "Search messages...",
        "messages_count": "Messages",
        "no_messages": "No messages in queue",
        "no_messages_sub": "Perform a mutation to generate a message",
        "json_payload": "JSON Payload",
        "copy_json": "Copy JSON",
        "status_log": "Status Log",
        "gen_msg_log": "Message successfully generated from mutation hook.",
        "sent_msg_log": "Sent to backend interfacing layer.",
        "proc_msg_log": "Confirmed by Earnie Messaging Service.",
        "inspector_title": "Inspector",
        "inspector_desc": "Select a message to analyze the payload"
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
