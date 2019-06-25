export default class BuildService {
    constructor(shellProvider) {
        this.shellProvider = shellProvider;
    }

    /**
     * 
     * @param {string} inDir 
     * @param {string} outDir 
     * @param {Object} options 
     */
    async build(inDir, outDir, options = {}) {
        const {watch = false, hooks = [], onTaskStartHooks = [], onTaskFinishHooks = [], extraParams = []} = options;

        let task = watch ? 'watch' : 'build';

        for (let hook of Object.values(onTaskStartHooks)) {
            hook(task);
        }

        if (watch) {
            extraParams.push('-w')
        }

        await this.shellProvider.run('./node_modules/.bin/babel', inDir, '-d', outDir, ...extraParams);

        for (let hook of Object.values(onTaskFinishHooks)) {
            hook(task);
        }

        for (let hook of Object.values(hooks)) {
            hook();
        }
    }
}