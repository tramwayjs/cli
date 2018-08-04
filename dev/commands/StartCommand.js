import {Command, terminal, commands} from 'tramway-command';
import { ServerService, BuildService } from '../services';
import { GulpProvider } from '../providers';
import { DEV_DIRECTORY, DIST_DIRECTORY, MAIN_FILE } from '../config/defaults';

const {InputOption} = commands;
const {TimestampLog} = terminal;

export default class StartCommand extends Command {
    constructor() {
        super();
        const gulpProvider = new GulpProvider();
        this.serverService = new ServerService(gulpProvider, new BuildService(gulpProvider));
    }

    configure() {
        this.args.add(new InputOption('script', InputOption.string, `${MAIN_FILE}.js`));
        this.options.add((new InputOption('inDir', InputOption.string, DEV_DIRECTORY)));
        this.options.add((new InputOption('outDir', InputOption.string, DIST_DIRECTORY)));
        this.options.add(new InputOption('watch', InputOption.boolean));
    }

    action() {
        const script = this.getArgument('script');
        const inDir = this.getOption('inDir');
        const outDir = this.getOption('outDir');
        const watch = this.getOption('watch');

        const onRestartHooks = [
            () => new TimestampLog('Server restarted'),
        ];

        const onTaskStartHooks = [
            () => new TimestampLog('Starting server'),
        ];

        const onTaskFinishHooks = [
            () => new TimestampLog('Server started'),
        ];

        this.serverService.start(inDir, outDir, {script, watch, onRestartHooks, onTaskStartHooks, onTaskFinishHooks});
    }
}