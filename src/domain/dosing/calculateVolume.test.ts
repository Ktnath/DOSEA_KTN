import { describe, expect, it } from 'vitest';
import { calculateVolume } from './calculateVolume';
import { DosingError } from './types';

describe('calculateVolume', () => {
  it('calcule 5 mL pour une dose de 150 mg à 30 mg/mL', () => {
    const result = calculateVolume({ doseMg: 150, concentrationMgPerMl: 30 });
    expect(result.volumeMl).toBe(5);
  });

  it('arrondit le volume à 2 décimales', () => {
    const result = calculateVolume({ doseMg: 100, concentrationMgPerMl: 30 });
    expect(result.volumeMl).toBe(3.33);
  });

  it('lève une erreur si la concentration est négative ou nulle', () => {
    expect(() => calculateVolume({ doseMg: 150, concentrationMgPerMl: 0 })).toThrow(DosingError);
    expect(() => calculateVolume({ doseMg: 150, concentrationMgPerMl: -30 })).toThrow(DosingError);
  });

  it('lève une erreur si la dose est négative', () => {
    expect(() => calculateVolume({ doseMg: -10, concentrationMgPerMl: 30 })).toThrow(DosingError);
  });
});
