export default {
    packageManager: 'npm', 
    command: 'i', 
    spawnOptions: {
        shell: 'win32' === process.platform,
    },
}