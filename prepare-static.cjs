// Prepare the existing, buildless portfolio for private Sites hosting.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', '.nojekyll']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
for (const directory of ['assets', 'writing']) {
  fs.cpSync(path.join(root, directory), path.join(output, directory), { recursive: true });
}
console.log('Prepared static portfolio in dist.');
