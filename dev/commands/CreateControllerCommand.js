import {Command, commands} from 'tramway-command';
import path from 'path';

import { 
    CreateController, 
    CreateRoute 
} from '../recipes';

const {InputOption} = commands;

export default class CreateControllerCommand extends Command {
    constructor() {
        super();
    }

    configure() {
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(new InputOption('dir', InputOption.string, "controllers"));
        // this.options.add((new InputOption('num', InputOption.number)).isRequired());
        // this.options.add(new InputOption('arr', InputOption.array));
        this.options.add(new InputOption('add-routes', InputOption.boolean));
    }

    action() {
        let name = this.getArgument('name');
        let dir = this.getOption('dir');
        let addRoutes = this.getOption('add-routes');

        let recipe = new CreateController(dir);

        let next = [];

        if (addRoutes) {
            next.push(new CreateRoute('conf', 'controllers'));
        }

        recipe.execute({className: name}, ...next);
    }

}