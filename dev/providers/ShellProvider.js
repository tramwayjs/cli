import {spawn} from 'child_process';

export default class ShellProvider {
    constructor(options = {}) {
        const {onCloseHook} = options;
        this.onCloseHook = onCloseHook;
    }

    async run(command, ...args) {
        return await new Promise((resolve, reject) => {
            let errBuffer = [];

            const shell = spawn(command, args);
            shell.stdout.on('data', data => resolve(data));
            shell.stderr.on('data', data => errBuffer.push(data));
            shell.on('close', code => {
                let data = Buffer.concat(errBuffer).toString('utf8');

                if (code > 0) {
                    return reject({code, data});
                }

                return this.onCloseHook && this.onCloseHook(code, data);
            });
        });
    }
}