// Prepare the existing, buildless portfolio for private Sites hosting.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const output = path.join(root, 'dist');
// Clear only this checkout's generated output so replaced images cannot linger.
if (path.resolve(output) !== path.resolve(root, 'dist') || path.dirname(output) !== root) {
  throw new Error('Refusing to clear an output directory outside this checkout.');
}
if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) {
  throw new Error('Output must not be a symbolic link.');
}
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', '.nojekyll']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
for (const directory of ['assets', 'writing']) {
  fs.cpSync(path.join(root, directory), path.join(output, directory), { recursive: true });
}
console.log('Prepared static portfolio in dist.');
