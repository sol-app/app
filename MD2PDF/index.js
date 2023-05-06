const fs = require('fs');
const path = require('path');
const markdownpdf = require('markdown-pdf');

// Set the input directory and file extensions
const inputDir = './input';
const extensions = ['.md'];

// Check if the input directory exists
if (!fs.existsSync(inputDir)) {
  console.error(`Input directory '${inputDir}' does not exist.`);
  process.exit(1);
}

// Read all files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(`Failed to read input directory: ${err}`);
    process.exit(1);
  }

  // Filter files by extension
  const mdFiles = files.filter(file => extensions.includes(path.extname(file)));

  // Convert markdown files to PDF
  mdFiles.forEach(file => {
    const inputFile = path.join(inputDir, file);
    const pdfOutputFile = path.join(inputDir, `${path.basename(file, '.md')}.pdf`);

    // Convert to PDF
    markdownpdf().from(inputFile).to(pdfOutputFile, (err) => {
      if (err) {
        console.error(`Failed to convert ${inputFile} to PDF: ${err}`);
      } else {
        console.log(`Converted ${inputFile} to ${pdfOutputFile}`);
      }
    });
  });
});