#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// CLI 도움말 표시
function showHelp() {
  console.log(`
🔧 es-toolkit Codemod for Lodash Migration

Usage:
  npx @es-toolkit/codemod-lodash-to-es-toolkit <path>

Options:
  <path>         Path to files or directory to transform
  --dry          Dry run (preview changes without applying)
  --help, -h     Show this help message

Examples:
  npx @es-toolkit/codemod-lodash-to-es-toolkit src/
  npx @es-toolkit/codemod-lodash-to-es-toolkit src/components/ --dry
  npx @es-toolkit/codemod-lodash-to-es-toolkit src/utils/helpers.ts

Description:
  This codemod automatically transforms your lodash imports to es-toolkit/compat imports:
  
  • import _ from 'lodash' → import * as _ from 'es-toolkit/compat'
  • import { map } from 'lodash' → import { map } from 'es-toolkit/compat'  
  • import debounce from 'lodash/debounce' → import { debounce } from 'es-toolkit/compat'
  • import { map } from 'lodash-es' → import { map } from 'es-toolkit/compat'

Features:
  • Preserves original quote style (single or double quotes)
  • Handles all lodash import patterns
  • Safe AST-based transformations

Repository: https://github.com/toss/es-toolkit
  `);
}

// 메인 실행 로직
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const targetPath = args[0];
  const isDryRun = args.includes('--dry');

  if (!fs.existsSync(targetPath)) {
    console.error(`❌ Error: Path "${targetPath}" does not exist.`);
    process.exit(1);
  }

  const transformPath = path.join(__dirname, '../dist/transform.js');

  if (!fs.existsSync(transformPath)) {
    console.error(`❌ Error: Transform file not found. Please ensure the package is built correctly.`);
    console.log('💡 Try running: npm run build');
    process.exit(1);
  }

  console.log(`🚀 Running lodash → es-toolkit/compat codemod...`);
  console.log(`📁 Target: ${targetPath}`);
  console.log(`🔄 Mode: ${isDryRun ? 'Dry run (preview only)' : 'Apply changes'}`);
  console.log('');

  try {
    const cmd = [
      'npx',
      'jscodeshift',
      '-t',
      transformPath,
      targetPath,
      '--extensions=ts,tsx,js,jsx',
      '--parser=tsx',
      isDryRun ? '--dry' : '',
      isDryRun ? '--print' : '--silent',
    ]
      .filter(Boolean)
      .join(' ');

    const result = execSync(cmd, {
      encoding: 'utf8',
      stdio: isDryRun ? 'pipe' : 'inherit',
    });

    if (isDryRun && result.trim()) {
      console.log('🔍 Preview of changes:');
      console.log('─'.repeat(50));
      console.log(result);
      console.log('─'.repeat(50));
      console.log('');
      console.log('💡 To apply these changes, run the command without --dry flag');
    } else if (!isDryRun) {
      console.log('✅ Transformation completed successfully!');
      console.log('');
      console.log('📝 Please review the changes and test your application.');
      console.log('🔗 Learn more about es-toolkit: https://es-toolkit.slash.page');
      console.log('📖 compat mode docs: https://es-toolkit.slash.page/docs/compat');
    } else {
      console.log('ℹ️  No lodash imports found to transform.');
    }
  } catch (error) {
    console.error('❌ Error running codemod:', error.message);
    process.exit(1);
  }
}

// CLI 실행
if (require.main === module) {
  main();
}

module.exports = { main };
