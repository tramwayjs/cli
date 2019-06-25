export default {
    command: './node_modules/.bin/nodemon', 
    spawnOptions: {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    }
}