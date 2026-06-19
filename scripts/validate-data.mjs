#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'public', 'data');
const files = ['drugs.json', 'protocols.json'];

let hasError = false;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    JSON.parse(readFileSync(filePath, 'utf-8'));
    console.log(`OK   ${file}`);
  } catch (error) {
    hasError = true;
    console.error(`FAIL ${file}: ${error.message}`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log('Validation des donnees: tous les fichiers JSON sont syntaxiquement valides.');
console.log('Note: la validation par schema medical sera ajoutee ultérieurement.');
