import { DoseResult, SafetyCheckResult, SafetyLevel } from './types';

/**
 * Évalue le niveau de sécurité d'un résultat de calcul de dose.
 * - 'warning' si la dose a été plafonnée à maxDoseMg.
 * - 'danger' si la dose journalière estimée dépasse maxDailyDoseMg (alerte forte).
 */
export function checkDoseSafety(result: DoseResult): SafetyCheckResult {
  const messages: string[] = [];
  let level: SafetyLevel = 'ok';

  if (result.wasCapped) {
    messages.push(
      `Dose calculée (${result.rawDoseMg} mg) plafonnée à la dose maximale autorisée (${result.doseMg} mg).`
    );
    level = 'warning';
  }

  if (result.exceedsMaxDailyDose) {
    messages.push(
      `Alerte : la dose journalière estimée (${result.dailyDoseMg} mg) dépasse la dose maximale journalière autorisée.`
    );
    level = 'danger';
  }

  return { level, messages };
}
