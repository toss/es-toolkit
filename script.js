#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

// Find all spec files recursively in src/compat
const specFiles = glob.sync('./src/compat/**/*.spec.ts');

specFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Look for relative imports of the form: import { func } from './func'
  const relativeImportRegex = /import\s*{\s*(\w+)\s*}\s*from\s*['"].*\1.*['"];?/g;

  // Replace with import from es-toolkit/compat
  const updatedContent = content.replace(relativeImportRegex, (match, funcName) => {
    if (match.includes('internal')) {
      return match;
    }

    console.log(match);
    return `import { ${funcName} } from 'es-toolkit/compat';`;
  });

  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`Updated imports in ${file}`);
  }
});
