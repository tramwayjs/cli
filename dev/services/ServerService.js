import nodemon from 'gulp-nodemon';

export default class ServerService {
    constructor(gulpProvider, buildService) {
        this.gulpProvider = gulpProvider;
        this.buildService = buildService;
    }

    start(inDir, outDir, options = {}) {
        const {script, watch = false, onTaskStartHooks = [], onTaskFinishHooks = [], onRestartHooks = []} = options;

        let task = watch ? 'watch' : 'build';
        this.initializeTasks(inDir, outDir, {task, script, onTaskStartHooks, onTaskFinishHooks, onRestartHooks})

        return this.gulpProvider.start('server');
    }

    initializeTasks(inDir, outDir, options = {}) {
        const {task, script, onTaskStartHooks = [], onTaskFinishHooks = [], onRestartHooks = []} = options;

        this.buildService.initializeTasks(inDir, outDir);

        this.gulpProvider.task('server', 
            () => {
                return nodemon({
                    script: this.generateScriptPath(outDir, script)
                }).on('restart', () => {
                    onRestartHooks.forEach(hook => hook && hook.call && hook.apply && hook());
                })
            },
            {
                preOps: [task],
                onStartHooks: onTaskStartHooks,
                onFinishHooks: onTaskFinishHooks,
            }
        )
    }

    generateScriptPath(outDir, script) {
        return `${outDir}/${script}`;
    }
}