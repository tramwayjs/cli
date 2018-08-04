import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateController, 
    CreateRoute 
} from '../recipes';

const {InputOption} = commands;

export default class CreateControllerCommand extends CreateClassCommand {
    configure() {
        const { 
            CONTROLLER_DIRECTORY, 
            ROUTES_CONFIG_FILENAME, 
            CONFIG_DIRECTORY 
        } = this.defaults;
        
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(
            new InputOption(
                'dir', 
                InputOption.string, 
                this.directoryResolver.resolve(CONTROLLER_DIRECTORY)
            )
        );
        this.options.add(new InputOption('actions', InputOption.array));
        this.options.add(new InputOption('add-routes', InputOption.boolean));
        this.options.add(
            new InputOption(
                'routes-dir', 
                InputOption.string, 
                this.directoryResolver.resolve(CONFIG_DIRECTORY)
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

        let recipe = new CreateController(dir, version);

        let next = [];

        if (shouldAddRoutes) {
            next.push(new CreateRoute(routesDir, routesFilename));
        }

        recipe.execute({className: name, actions}, ...next);
    }

}