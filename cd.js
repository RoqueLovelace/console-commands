const pc = require('picocolors');
const directory = process.argv[2] ?? '.';

try {
  process.chdir(directory);
  console.log(process.cwd());
} catch {
  console.error(pc.red(`Error: could not change to directory ${directory}`));
  usage();
}

function usage () {
  console.log(pc.yellow('Usage: node cd.js <directory>'));
  process.exit(1);
}
// NOTE: THIS SCRIPT WILL NOT WORK AS CD FROM BATCH BECAUSE IT CHANGES THE DIRECTORY OF THE PROCESS,
// NOT THE DIRECTORY OF THE SHELL OR COMMAND PROMPT.
