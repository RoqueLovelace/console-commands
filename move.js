const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const file = process.argv[2];
const destination = process.argv[3];

move(file, destination);

async function move (file, destination) {
  await validateFiles(file, destination);
  file = path.resolve(file);
  destination = path.resolve(destination);
  const newDir = path.join(destination, path.basename(file));
  // newName = path.basename(newName);
  // fs.rename(file, path.join(path.dirname(file), newName));
  fs.rename(file, newDir);
  console.log(pc.green(`file successfully moved: ${file} -> ${newDir}`));
}

async function validateFiles (file, destination) {
  if (typeof file === 'undefined' || typeof destination === 'undefined') {
    console.error(pc.red('Error: two arguments are required.'));
    usage();
  }

  if (path.extname(file) === '') {
    console.error(pc.red('Error: extension of file is missing.'));
    usage();
  }

  try {
    await fs.access(file, fs.constants.F_OK);
  } catch {
    console.error(pc.red(`Error: ${file} not found`));
    usage();
  }
  try {
    await fs.access(destination, fs.constants.F_OK);
  } catch {
    console.error(pc.red(`Error: ${destination} not found`));
    usage();
  }

  const fileStats = await fs.stat(file);
  if (fileStats.isDirectory()) {
    console.error(pc.red('Error: the file to move cannot be a directory'));
    usage();
  }
  const destinationStats = await fs.stat(destination);
  if (!destinationStats.isDirectory()) {
    console.error(pc.red('Error: the destination must be a directory'));
    usage();
  }
}

function usage () {
  console.log(pc.yellow('Usage: node move.js <file> <destination>'));
  process.exit(1);
}
