const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const drugsDir = path.join(__dirname, 'drugs');
const outDir = path.join(__dirname, '_pdf_out');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(drugsDir).filter(f => f.endsWith('.pdf'));

async function main() {
    for (const file of files) {
        const filePath = path.join(drugsDir, file);
        const dataBuffer = fs.readFileSync(filePath);
        try {
            // pdf-parse default export is the function itself
            const parseFn = typeof pdf === 'function' ? pdf : pdf.default;
            const data = await parseFn(dataBuffer);
            const outFile = path.join(outDir, file.replace('.pdf', '.txt'));
            fs.writeFileSync(outFile, data.text);
            console.log(`OK ${file}: ${data.numpages} pages, ${data.text.length} chars`);
        } catch (err) {
            console.error(`FAIL ${file}: ${err.message}`);
        }
    }
}
main();
