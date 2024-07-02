const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');
const rl = require('node:readline').createInterface({

  input: process.stdin,
  output: process.stdout
});

// this script wil work as DEL from batch
// we will use fs.rm to remove files and

const file = process.argv[2];

if (file === undefined) {
  usage();
}

del(file);

async function del (file) {
  let stats;
  try {
    stats = await fs.stat(file);
  } catch {
    console.error(pc.red(`Error: ${file} not found`));
    usage();
  }

  if (stats.isDirectory()) {
    delEverythingInside(path.resolve(file));
  } else {
    delFile(path.resolve(file));
  }
}

async function delEverythingInside (dir) {
  rl.question(`Are you sure you want to delete everything inside ${dir}? (y/n) `, async (answer) => {
    if (answer.toLowerCase() === 'y') {
      const files = await fs.readdir(dir);
      for (const file of files) {
        console.log(`Deleting ${file} ...`);
        await fs.rm(path.join(dir, file), { recursive: true });
      }
    }
    rl.close();
    process.exit(0);
  });
}

function usage () {
  console.log(pc.yellow('Usage: node del.js <file>'));
  process.exit(1);
}

async function delFile (file) {
  rl.question(`Are you sure you want to delete ${file}? (y/n) `, async (answer) => {
    if (answer.toLowerCase() === 'y') {
      console.log(`Deleting ${file} ...`);
      await fs.rm(file);
    }
    rl.close();
    process.exit(0);
  });
}
