const { spawnSync } = require('child_process');
const path = require('path');

// Usage: node tools/generate-client.js <openapi-file> [outDir]
// Example: node tools/generate-client.js openapi/invoice-api.yaml src/app/api-client

const input = process.argv[2] || process.env.OPENAPI_FILE || '../../openapi/invoice-api.yaml';
const outDir = process.argv[3] || process.env.OPENAPI_OUT || 'src/app/api-client';

console.log(`Generating TypeScript Angular client from: ${input}`);
console.log(`Output directory: ${outDir}`);

const args = [
  '@openapitools/openapi-generator-cli',
  'generate',
  '-g',
  'typescript-angular',
  '-i',
  input,
  '-o',
  outDir,
  '--skip-validate-spec'
];

// Use npx so the installed devDependency is used if available
const cmd = 'npx';

const res = spawnSync(cmd, args, { stdio: 'inherit', shell: true });

if (res.error) {
  console.error('Generation failed:', res.error);
  process.exit(1);
}

if (res.status !== 0) {
  console.error('openapi-generator exited with code', res.status);
  process.exit(res.status);
}

console.log('Client generated successfully.');
