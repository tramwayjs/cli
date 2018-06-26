import path from 'path';
import { FileProvider } from './providers';

const fileProvider = new FileProvider();

let directory = path.dirname(require.main.filename);
let installDirectory = directory.substring(0, directory.indexOf('node_modules'));

if (!installDirectory) {
    console.log(`No install directory was found, please confirm ${directory} is the library itself`);
}

console.log(`Installing tramway.js to ${installDirectory}`);

try {
    fileProvider.write(installDirectory, 'tramway', `module.exports = require('tramway-core-config');`);
    console.log(`You can now use tramway.js to execute various helper commands.`);
} catch (e) {
    console.log(`There was an issue setting up tramway.js`);
}