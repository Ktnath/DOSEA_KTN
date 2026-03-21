# D.O.S.E.A - Architecture Document (ARCHITECTURE.md)

## 1. High-Level Changes
The application requires architectural additions to the State Management (Zustand), the local Database (Dexie IndexedDB), and specific UI integrations.

## 2. State Management Updates (`useAppStore.ts`)
- `sessionWeight`: Global variable keeping track of the current patient's weight.
- `sessionAge`: Global variable keeping track of the current patient's age.
- `activePrescriptions`: Array of calculated drugs for the current session.
- `protocols`: Array of loaded protocols from the database.

## 3. Database Updates (`services/db.ts`)
- **Table `drugs`**: Schema update to include `system` (Biological System), `dilutionParameters` (optional JSON for IV fluids).
- **Table `protocols`**: New table to store structured protocols protocols (e.g., name, description, array of drug identifiers and default frequency).

## 4. New Components
- `VoiceAssistant.tsx`: Component managing the `window.SpeechRecognition` API. Needs a robust parsing function (regex/Levenshtein distance) to match spoken words like "amoxicilline", "quinine" to the database `drug.name`.
- `ProtocolSelector.tsx`: Dropdown or grid showing available protocols and injecting them into `activePrescriptions`.
- `PrescriptionCart.tsx`: Shows the ongoing multiple "Ordonnance".
- `IVFlowCalculator.tsx`: Embedded in the drug card, calculating `ml/h` and `drops/min`.

## 5. Third-Party Integrations
- Web Speech API: Only supported natively in Chrome/Safari. A graceful fallback must be mapped when used on unsupported browsers.
