import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

const {InputOption} = commands;

export default class CreateControllerCommand extends CreateClassCommand {
    constructor(recipe, directoryResolver, defaults, routeRecipe) {
        super(recipe, directoryResolver, defaults);
        this.routeRecipe = routeRecipe;
    }

    configure() {
        const { 
            CONTROLLER_DIRECTORY, 
            ROUTES_CONFIG_FILENAME, 
            DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY, 
        } = this.defaults;
        
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(
            new InputOption(
                'dir', 
                InputOption.string, 
                this.directoryResolver.resolve(CONTROLLER_DIRECTORY)
            )
        );
        this.options.add(new InputOption('actions', InputOption.array, ['index']));
        this.options.add(new InputOption('add-routes', InputOption.boolean));
        this.options.add(
            new InputOption(
                'routes-dir', 
                InputOption.string, 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY)
            )
        );
        this.options.add(new InputOption('routes-filename', InputOption.string, ROUTES_CONFIG_FILENAME));
        this.options.add(new InputOption('version', InputOption.number));
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const shouldAddRoutes = this.getOption('add-routes');
        const actions = this.getOption('actions');
        const routesDir = this.getOption('routes-dir');
        const routesFilename = this.getOption('routes-filename');
        const version = this.getOption('version');

        this.recipe.create(name, dir, {version, args: [actions, version]})

        if (shouldAddRoutes) {
            actions.forEach(action => {
                this.routeRecipe.create(
                    routesFilename, 
                    routesDir, 
                    {
                        action, 
                        service: `controller.${name.toLowerCase().replace('controller', '')}`,
                    }
                )
            });
        }
    }

}