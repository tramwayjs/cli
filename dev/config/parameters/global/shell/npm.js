export default {
    packageManager: 'npm', 
    command: 'install', 
    args: ['--save'],
    spawnOptions: {
        shell: 'win32' === process.platform,
    },
}