import {spawn} from 'child_process';

export default class ShellProvider {
    listeners = [];

    constructor(options = {}) {
        const {onCloseHook, spawnOptions} = options || {};
        this.onCloseHook = onCloseHook;

        this.spawnOptions = spawnOptions;
    }

    addListener(event, cb) {
        this.listeners.push([event, cb]);
    }

    async run(command, ...args) {
        return await new Promise((resolve, reject) => {
            let errBuffer = [];

            if (this.spawnOptions && this.spawnOptions.stdio) {
                this.spawnOptions.stdio = Object.values(this.spawnOptions.stdio);
            }

            const shell = spawn(command, args, this.spawnOptions);
            shell.stdout.on('data', data => resolve(data));
            shell.stderr.on('data', data => errBuffer.push(data));
            shell.on('close', code => {
                let data = Buffer.concat(errBuffer).toString('utf8');

                if (code > 0) {
                    return reject({code, data});
                }

                return this.onCloseHook && this.onCloseHook(code, data);
            });

            for(let [event, cb] of Object.values(this.listeners)) {
                shell.on(event, (...args) => cb(shell, ...args));
            }
        });
    }
}