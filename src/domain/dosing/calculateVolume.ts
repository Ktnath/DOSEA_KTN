import { VolumeInput, VolumeResult, DosingError } from './types';

/** Calcule le volume à administrer (mL) à partir d'une dose (mg) et d'une concentration (mg/mL). */
export function calculateVolume(input: VolumeInput): VolumeResult {
  const { doseMg, concentrationMgPerMl } = input;

  if (!(doseMg >= 0)) {
    throw new DosingError('INVALID_DOSE_MG', 'La dose en mg doit être positive ou nulle.');
  }

  if (!(concentrationMgPerMl > 0)) {
    throw new DosingError(
      'INVALID_CONCENTRATION',
      'La concentration (mg/mL) doit être strictement positive.'
    );
  }

  const volumeMl = Math.round((doseMg / concentrationMgPerMl) * 100) / 100;

  return { volumeMl };
}
