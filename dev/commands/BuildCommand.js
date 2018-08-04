import {Command, commands, terminal} from 'tramway-command';
import {BuildService} from '../services';
const {InputOption} = commands;
const {ProgressBar, TimestampLog, TimestampSuccess} = terminal;

export default class BuildCommand extends Command {
    /**
     * 
     * @param {BuildService} buildService 
     */
    constructor(buildService, defaults = {}) {
        super();

        this.buildService = buildService;
        this.defaults = defaults;
    }

    configure() {
        const { DEV_DIRECTORY, DIST_DIRECTORY } = this.defaults;

        this.args.add((new InputOption('inDir', InputOption.string, DEV_DIRECTORY)));
        this.args.add((new InputOption('outDir', InputOption.string, DIST_DIRECTORY)));
        this.options.add(new InputOption('watch', InputOption.boolean));
    }

    action() {
        const inDir = this.getArgument('inDir');
        const outDir = this.getArgument('outDir');
        const watch = this.getOption('watch');

        let progressBar = new ProgressBar('Building project', watch ? 3 : 2);

        const hooks = [
            () => {
                if (progressBar.isComplete()) { 
                    new TimestampSuccess(`Build ran successfully, go to ${outDir} to see the results`);
                }

                if (watch) {
                    progressBar = new ProgressBar('Building project', 2);
                    new TimestampLog(`Waiting for changes...`);
                }
            }
        ]

        const onTaskStartHooks = [
            name => progressBar.start(`Starting task ${name}`),
        ];

        const onTaskFinishHooks = [
            name => progressBar.finish(`Finished task ${name}`),
        ];

        this.buildService.build(inDir, outDir, {watch, hooks, onTaskStartHooks, onTaskFinishHooks});
    }
}