import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

const {InputOption} = commands;

export default class CreateRouteCommand extends CreateClassCommand {
    constructor(recipe, directoryResolver, defaults, controllerRecipe) {
        super(recipe, directoryResolver, defaults);
        this.controllerRecipe = controllerRecipe;
    }

    configure() {
        const { 
            CONTROLLER_DIRECTORY, 
            ROUTES_CONFIG_FILENAME, 
            CONFIG_DIRECTORY 
        } = this.defaults;

        this.args.add((new InputOption('controller', InputOption.string)).isRequired());
        this.args.add((new InputOption('action', InputOption.string)).isRequired());
        this.args.add(new InputOption('path', InputOption.string));
        this.options.add(new InputOption('methods', InputOption.array));
        this.options.add(new InputOption('args', InputOption.array));
        this.options.add(new InputOption('create-controller', InputOption.boolean));
        this.options.add(new InputOption('dir', InputOption.string, this.directoryResolver.resolve(CONFIG_DIRECTORY)));
        this.options.add(new InputOption('controller-dir', InputOption.string, this.directoryResolver.resolve(CONTROLLER_DIRECTORY)));
        this.options.add(new InputOption('filename', InputOption.string, ROUTES_CONFIG_FILENAME));
        this.options.add(new InputOption('version', InputOption.number));
    }

    action() {
        const dir = this.getOption('dir');
        const filename = this.getOption('filename');
        const controllerDir = this.getOption('controller-dir');

        const controller = this.getArgument('controller');
        const action = this.getArgument('action');
        const path = this.getArgument('path');
        const methods = this.getOption('methods');
        const args = this.getOption('args');
        const shouldCreateController = this.getOption('create-controller');
        const version = this.getOption('version');
        
        this.recipe.create(
            filename, 
            dir, 
            {
                className: controller,
                action,
                path,
                methods,
                routeArgs: args,
            }
        );

        if (shouldCreateController) {
            this.controllerRecipe.create(controller, controllerDir, {version, args: [actions, version]})
        }
    }
}