import { z } from 'zod';
import { isValidINSZ, isValidIBAN } from '../utils/validation';

export const personSnapshotSchema = z.object({
  aanvangsDatum: z.string().min(1, 'Aanvangsdatum is verplicht'),
  inszNummer: z.string().refine(isValidINSZ, {
    message: 'Ongeldig Belgisch Rijksregisternummer (INSZ)',
  }),
  familieNaam: z.string().min(1, 'Familienaam is verplicht'),
  voornaam: z.string().min(1, 'Voornaam is verplicht'),
  geslacht: z.enum(['Man', 'Vrouw', 'X']),
  taal: z.enum(['Nederlands', 'Frans']),
  emailLoonbrief: z.string().email('Ongeldig e-mailadres voor loonbrief').or(z.literal('')),
  iban: z.string().refine(isValidIBAN, {
    message: 'Ongeldig Belgisch IBAN nummer',
  }).optional().or(z.literal('')),
  gemeente: z.string().min(1, 'Gemeente is verplicht'),
  postCode: z.string().min(4, 'Postcode is te kort'),
  aantalKinderenTenLaste: z.number().min(0).max(20).default(0),
  mindervalide: z.boolean().default(false),
});

export type PersonSnapshot = z.infer<typeof personSnapshotSchema>;
