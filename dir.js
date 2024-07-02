const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const directory = process.argv[2] ?? '.';

// function to get all files in a directory
async function dir (directory) { // async function because we will need to await readdir so we can manipulate the files later in this function
  let files;

  try { // try-catch block because readdir will fail if there is no such directory
    files = await fs.readdir(directory); // we need to WAIT for the promise to resolve
  } catch {
    console.error(pc.red(`Error: could not change to directory ${directory}`));
    usage();
  }

  files = files.map(async file => { // map over the files and RETURN a PROMISE for each file
    const filePath = path.join(directory, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error(pc.red(`Error: could not read file ${filePath}`));
      usage();
    }

    const fileType = stats.isDirectory() ? pc.yellow('<DIR>') : '<FILE>';
    const fileSize = stats.size.toString();
    const fileModified = stats.atime.toLocaleString();

    return `${file.padEnd(30)} ${fileSize.padEnd(10)} ${fileType.padEnd(10)} ${fileModified.padStart(10)}`;
  });

  const resolvedFiles = await Promise.all(files); // wait for all promises to resolve
  resolvedFiles.forEach(file => {
    console.log(file);
  });
}

function usage () {
  console.log(pc.yellow('Usage: node dir.js <directory>'));
  process.exit(1);
}

dir(directory);
