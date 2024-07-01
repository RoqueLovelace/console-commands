const fs = require('node:fs/promises');
const path = require('node:path');  

const file = path.resolve(process.argv[2]);
const destination = path.resolve(process.argv[3]);

move(file, destination);

async function move(file, destination) {
    await validateFiles(file, destination);
    fs.rename(file, destination + path.sep + path.basename(file));
}

async function validateFiles(file, destination) {
    if (typeof file === 'undefined' || typeof destination === 'undefined') {
        console.error('Error: two arguments are required.');
        usage();
    }  
    
    if(path.extname(file) === ''){
        console.error('Error: extension of file is missing.');
        usage();
    } 
    
    try {
        await fs.access(file, fs.constants.F_OK);
    } catch {
        console.error(`Error: ${file} not found`);
        usage();
    }
    try {
        await fs.access(destination, fs.constants.F_OK);
    } catch {
        console.error(`Error: ${destination} not found`);
        usage();
    }

    let fileStats = await fs.stat(file);
    if (fileStats.isDirectory()) {
        console.error('Error: the file to move cannot be a directory');
        usage();
    }
    let destinationStats = await fs.stat(destination);
    if (!destinationStats.isDirectory()) {
        console.error('Error: the destination must be a directory');
        usage();
    }
}

function usage() { 
    console.log('Usage: node move.js <file> <destination>'); 
    process.exit(1);
}