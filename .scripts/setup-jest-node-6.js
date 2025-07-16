const fs = require('fs');
const { execSync } = require('child_process');

// Remove existing package.json
try {
  fs.unlinkSync('package.json');
} catch (error) {
  // Ignore if file doesn't exist
}

// Create new minimal package.json
const packageJson = {
  name: 'es-toolkit-node-6',
  version: '1.0.0',
  private: true,
  devDependencies: {
    '@babel/core': '^7.28.0',
    '@babel/preset-env': '^7.28.0',
    '@babel/preset-typescript': '^7.27.1',
    jest: '^24', // Using older Jest version compatible with Node 6
  },
};

// Write new package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
