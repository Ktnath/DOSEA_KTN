# D.O.S.E.A - Data Dictionary (DATA_DICTIONARY.md)

## 1. Modifications to `drugs.json` / `Drug` Interface
Each drug object will now optionally include:
- `therapeuticClass` (string): e.g., "Antibiotique (Céphalosporine 3G)"
- `biologicalSystem` (string): e.g., "Infectiologie", "Cardiovasculaire", "Système Nerveux"
- `dilution` (object, optional):
  - `fluid` (string): e.g., "NaCl 0.9% ou G5%"
  - `standardConcentrationMgPerMl` (number)
  - `bolusTimeMinutes` (number, optional)
  - `continuousInfusion` (boolean)

## 2. New Entity: `Protocol`
A new file `protocols.json` and a corresponding Dexie table will be created.

```typescript
interface Protocol {
  id: string; // Unique identifier (e.g., "p-sepsis-neo")
  name: string; // Display name (e.g., "Sepsis Néonatal")
  description: string; // Clinical context
  source: string; // e.g., "CHU Sainte-Justine 2018"
  drugs: {
    drugName: string; // Must match exactly a name in `drugs.json`
    indicationOverride?: string; // Specific indication for this protocol
  }[];
}
```

## 3. Session State (Zustand Store)
- `activePatientWeight`: `number | null`
- `activePatientAgeMonths`: `number | null`
- `prescriptionCart`: Array of selected `Drug` objects with their calculated dose.

No patient identifiable information (Name, ID, Room) is stored.
