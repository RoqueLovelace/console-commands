const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');
const file = process.argv[2];
const newName = process.argv[3];

rename(path.resolve(file), newName);

async function rename(file, newName) {
  await validateFiles(file, newName);
  const newDir = path.join(path.dirname(file), newName);
  fs.rename(file, newDir);
  console.log(pc.green(`file successfully renamed: ${file} -> ${newDir}`));
}

async function validateFiles(file, newName) {
  if (typeof file === 'undefined' || typeof newName === 'undefined') {
    console.error(pc.red('Error: Command syntax is incorrect. Two arguments are required.'));
    usage();
  }

  try {
    await fs.access(file, fs.constants.F_OK);
  } catch {
    console.error(pc.red(`Error: File ${file} does not exist`));
    usage();
  }

  let stats;

  try {
    stats = await fs.stat(file);
  } catch {
    console.error(pc.red(`Error: Problems when reading file ${file}`));
    usage();
  }

  if (!stats.isDirectory()) {
    if (path.extname(newName) === '' || path.extname(file) === '') {
      console.error(pc.red('Error: Missing one or both file extensions.'));
      usage();
    }

    if (path.extname(newName) !== path.extname(file)) {
      console.error(pc.red('Error: extensions do not match.'));
      usage();
    }
  }
}

function usage() {
  console.log(pc.yellow('Usage: node rename.js <file> <newName>'));
  process.exit(1);
}
