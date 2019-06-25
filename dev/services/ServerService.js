export default class ServerService {
    constructor(nodemonShellProvider) {
        this.nodemonShellProvider = nodemonShellProvider;
    }

    async start(inDir, outDir, options = {}) {
        const {script, watch = false, onTaskStartHooks = [], onTaskFinishHooks = [], onRestartHooks = [], extraParams = []} = options;

        let task = watch ? 'watch' : 'build';

        for (let hook of Object.values(onTaskStartHooks)) {
            hook(task);
        }

        if (watch) {
            extraParams.push('---watch', outDir);
        }

        this.nodemonShellProvider.addListener('message', async (shell, event, ...s) => {
            if ('restart' === event.type) {
                for (let hook of Object.values(onRestartHooks)) {
                    hook();
                }
            }

            if ('crash' === event.type) {
                for (let hook of Object.values(onTaskFinishHooks)) {
                    hook();
                }

                throw new Error('Nodemon crashed');
            }
        })

        await this.nodemonShellProvider.run('./node_modules/.bin/nodemon', this.generateScriptPath(outDir, script), ...extraParams);
        
        for (let hook of Object.values(onTaskFinishHooks)) {
            hook(task);
        }
    }

    generateScriptPath(outDir, script) {
        return `${outDir}/${script}`;
    }
}