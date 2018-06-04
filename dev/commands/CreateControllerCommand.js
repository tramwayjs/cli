import {Command, commands} from 'tramway-command';
import path from 'path';

import { 
    CreateController, 
    CreateRoute 
} from '../recipes';

import { CONTROLLER_DIRECTORY, ROUTES_CONFIG_FILENAME, CONFIG_DIRECTORY } from '../config/defaults';

const {InputOption} = commands;

export default class CreateControllerCommand extends Command {
    constructor() {
        super();
    }

    configure() {
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(new InputOption('dir', InputOption.string, CONTROLLER_DIRECTORY));
        this.options.add(new InputOption('actions', InputOption.array));
        this.options.add(new InputOption('add-routes', InputOption.boolean));
        this.options.add(new InputOption('routes-dir', InputOption.string, CONFIG_DIRECTORY));
        this.options.add(new InputOption('routes-filename', InputOption.string, ROUTES_CONFIG_FILENAME));
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const shouldAddRoutes = this.getOption('add-routes');
        const actions = this.getOption('actions');
        const routesDir = this.getOption('routes-dir');
        const routesFilename = this.getOption('routes-filename');

        let recipe = new CreateController(dir);

        let next = [];

        if (shouldAddRoutes) {
            next.push(new CreateRoute(routesDir, routesFilename));
        }

        recipe.execute({className: name, actions}, ...next);
    }

}