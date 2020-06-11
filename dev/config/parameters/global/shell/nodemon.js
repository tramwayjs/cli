import path from 'path';

export default {
    command: path.resolve('./node_modules/.bin/nodemon'), 
    spawnOptions: {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        shell: 'win32' === process.platform,
    },
}