import { z } from 'zod';

/**
 * Belgian Data Validation Utilities
 */

/**
 * Validates a Belgian National Number (INSZ / Rijksregisternummer)
 * Rules:
 * - 11 digits
 * - Check digit = 97 - (First 9 digits % 97)
 * - For people born in 2000 or later, prepend '2' to the first 9 digits before calculation.
 */
export function isValidINSZ(insz: string): boolean {
  if (!insz) return false;
  const clean = insz.replace(/\D/g, '');
  if (clean.length !== 11) return false;

  const base = clean.substring(0, 9);
  const check = parseInt(clean.substring(9), 10);

  // Try logic for pre-2000
  const remainder1 = BigInt(base) % 97n;
  if (97 - Number(remainder1) === check) return true;

  // Try logic for post-2000 (prepend '2')
  const base2000 = '2' + base;
  const remainder2 = BigInt(base2000) % 97n;
  if (97 - Number(remainder2) === check) return true;

  return false;
}

/**
 * Validates a Belgian IBAN
 */
export function isValidIBAN(iban: string): boolean {
  if (!iban) return false;
  const clean = iban.replace(/\s/g, '').toUpperCase();
  if (!clean.startsWith('BE')) return false;
  if (clean.length !== 16) return false;

  return /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,30}$/.test(clean);
}

/**
 * Formats an INSZ number for display: 85.01.01-123.45
 */
export function formatINSZ(insz: string): string {
  if (!insz) return '';
  const clean = insz.replace(/\D/g, '');
  if (clean.length !== 11) return insz;
  return `${clean.substring(0, 2)}.${clean.substring(2, 4)}.${clean.substring(4, 6)}-${clean.substring(6, 9)}.${clean.substring(9, 11)}`;
}

/**
 * Zod Schema for Snapshot Data
 */
export const personSnapshotSchema = z.object({
  familieNaam: z.string().min(2, 'Familienaam is verplicht (min. 2 karakters)'),
  voornaam: z.string().min(2, 'Voornaam is verplicht (min. 2 karakters)'),
  inszNummer: z.string().refine(isValidINSZ, { message: 'Ongeldig Belgisch Rijksregisternummer' }),
  taal: z.enum(['Nederlands', 'Frans']),
  geslacht: z.enum(['Man', 'Vrouw', 'X']),
  emailLoonbrief: z.string().email('Ongeldig emailadres voor loonbrief'),
  straat: z.string().min(2, 'Straat is verplicht'),
  huisnummer: z.string().min(1, 'Nr is verplicht'),
  bus: z.string().optional(),
  postCode: z.string().min(4, 'Postcode is verplicht'),
  gemeente: z.string().min(2, 'Gemeente is verplicht'),
  land: z.string().min(2, 'Land is verplicht'),
  iban: z.string().refine(isValidIBAN, { message: 'Ongeldig Belgisch IBAN' }),
  bic: z.string().min(8, 'BIC is verplicht (8-11 karakters)'),
  burgerlijkeStaat: z.enum(['Ongehuwd', 'Gehuwd', 'Samenwonend', 'Weduwnaar', 'Gescheiden']),
  mindervalide: z.boolean().default(false),
  aantalKinderenTenLaste: z.coerce.number().min(0).max(20).default(0),
  aantalMindervalideKinderenTenLaste: z.coerce.number().min(0).max(20).default(0),
  aanvangsDatum: z.string().default(() => new Date().toISOString().split('T')[0]),
  werknemerskengetallen: z.array(z.string()).default([]),
});
