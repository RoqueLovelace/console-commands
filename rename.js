const fs = require('node:fs/promises');
const path = require('node:path');

const file = process.argv[2];
const newName = process.argv[3];

rename(file, newName);

async function rename(file, newName) {
    await validateFiles(file, newName);
    
    fs.rename(file, newName);
    console.log(`file successfully renamed: ${file} -> ${newName}`);
}

async function validateFiles(file, newName) {
    if (typeof file === 'undefined' || typeof newName === 'undefined') {
        console.error('Error: Command syntax is incorrect. Two arguments are required.');
        usage();
    }  
    
    if(path.extname(newName) === ''|| path.extname(file) === ''){
        console.error('Error: Missing one or both file extensions.');
        usage();
    }  
    
    if (path.extname(newName) !== path.extname(file)) {
        console.error('Error: Argument extensions do not match.');
        usage();
    }
    
    try {
        await fs.access(file, fs.constants.F_OK);
    } catch {
        console.error(`Error: File ${file} does not exist`);
        usage();
    }
}

function usage() {
    console.log('Usage: node rename.js <file> <newName>');
    process.exit(1);
}

