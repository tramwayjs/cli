import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateController, 
    CreateRoute 
} from '../recipes';

import { CONTROLLER_DIRECTORY, ROUTES_CONFIG_FILENAME, CONFIG_DIRECTORY } from '../config/defaults';

const {InputOption} = commands;

export default class CreateRouteCommand extends CreateClassCommand {
    configure() {
        this.args.add((new InputOption('controller', InputOption.string)).isRequired());
        this.args.add((new InputOption('action', InputOption.string)).isRequired());
        this.args.add(new InputOption('path', InputOption.string));
        this.options.add(new InputOption('methods', InputOption.array));
        this.options.add(new InputOption('args', InputOption.array));
        this.options.add(new InputOption('create-controller', InputOption.boolean));
        this.options.add(new InputOption('dir', InputOption.string, this.directoryResolver.resolve(CONFIG_DIRECTORY)));
        this.options.add(new InputOption('controller-dir', InputOption.string, this.directoryResolver.resolve(CONTROLLER_DIRECTORY)));
        this.options.add(new InputOption('filename', InputOption.string, ROUTES_CONFIG_FILENAME));
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

        let recipe = new CreateRoute(dir, filename);

        let next = [];

        if (shouldCreateController) {
            next.push(new CreateController(controllerDir));
        }

        recipe.execute({className: controller, action, actions: [action], path, methods, args}, ...next);
    }

}