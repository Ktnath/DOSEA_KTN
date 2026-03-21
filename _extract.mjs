import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const drugsDir = join(__dirname, 'drugs');
const outDir = join(__dirname, '_pdf_out');

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const files = readdirSync(drugsDir).filter(f => f.endsWith('.pdf'));

async function extractTextFromPdf(filePath) {
    const data = new Uint8Array(readFileSync(filePath));
    const doc = await getDocument({ data, useSystemFonts: true }).promise;
    let fullText = '';
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += `\n--- PAGE ${i} ---\n${pageText}`;
    }
    return { text: fullText, numPages: doc.numPages };
}

for (const file of files) {
    const filePath = join(drugsDir, file);
    try {
        const { text, numPages } = await extractTextFromPdf(filePath);
        const outFile = join(outDir, file.replace('.pdf', '.txt'));
        writeFileSync(outFile, text);
        console.log(`OK ${file}: ${numPages} pages, ${text.length} chars`);
    } catch (err) {
        console.error(`FAIL ${file}: ${err.message}`);
    }
}
