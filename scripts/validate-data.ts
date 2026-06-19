import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { z } from 'zod';
import {
  checkProtocolDrugReferences,
  DrugsFileSchema,
  ProtocolsFileSchema,
} from '../src/domain/data/medicalDataSchema';
import { PilotDrugsV2FileSchema } from '../src/domain/medicalModel/medicalModelSchema';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'public', 'data');

function readJsonFile(fileName: string): unknown {
  const filePath = path.join(dataDir, fileName);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const location = issue.path.length > 0 ? issue.path.join('.') : '(racine)';
      return `  - [${location}] ${issue.message}`;
    })
    .join('\n');
}

let hasError = false;

let drugsRaw: unknown;
try {
  drugsRaw = readJsonFile('drugs.json');
} catch (error) {
  console.error(`FAIL drugs.json: impossible de lire/parser le fichier (${(error as Error).message})`);
  process.exit(1);
}

let protocolsRaw: unknown;
try {
  protocolsRaw = readJsonFile('protocols.json');
} catch (error) {
  console.error(`FAIL protocols.json: impossible de lire/parser le fichier (${(error as Error).message})`);
  process.exit(1);
}

const drugsResult = DrugsFileSchema.safeParse(drugsRaw);
if (!drugsResult.success) {
  hasError = true;
  console.error(`FAIL drugs.json (${drugsResult.error.issues.length} erreur(s)):`);
  console.error(formatIssues(drugsResult.error));
} else {
  console.log(`OK   drugs.json (${drugsResult.data.length} médicament(s) valides)`);
}

const protocolsResult = ProtocolsFileSchema.safeParse(protocolsRaw);
if (!protocolsResult.success) {
  hasError = true;
  console.error(`FAIL protocols.json (${protocolsResult.error.issues.length} erreur(s)):`);
  console.error(formatIssues(protocolsResult.error));
} else {
  console.log(`OK   protocols.json (${protocolsResult.data.length} protocole(s) valides)`);
}

if (drugsResult.success && protocolsResult.success) {
  const referenceErrors = checkProtocolDrugReferences(protocolsResult.data, drugsResult.data);
  if (referenceErrors.length > 0) {
    hasError = true;
    console.error('FAIL références protocols.json -> drugs.json:');
    referenceErrors.forEach((message) => console.error(`  - ${message}`));
  } else {
    console.log('OK   références protocols.json -> drugs.json cohérentes');
  }
}

try {
  const pilotModule = await import('../src/domain/medicalModel/pilotDrugs.v2');
  const pilotDrugsV2 = pilotModule.pilotDrugsV2;
  const pilotResult = PilotDrugsV2FileSchema.safeParse(pilotDrugsV2);
  if (!pilotResult.success) {
    hasError = true;
    console.error(`FAIL pilotDrugs.v2 (${pilotResult.error.issues.length} erreur(s)):`);
    console.error(formatIssues(pilotResult.error));
  } else {
    console.log(`OK   pilotDrugs.v2 (${pilotResult.data.length} médicament(s) V2 valides)`);
  }
} catch (error) {
  console.log(
    `SKIP pilotDrugs.v2: module non trouvé ou non importable (${(error as Error).message})`,
  );
}

if (hasError) {
  process.exit(1);
}

console.log('Validation des données médicales: succès.');
