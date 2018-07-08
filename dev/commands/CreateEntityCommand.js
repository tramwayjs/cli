import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateEntity, 
} from '../recipes';

import { ENTITY_DIRECTORY } from '../config/defaults';

const {InputOption} = commands;

export default class CreateEntityCommand extends CreateClassCommand {
    configure() {
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(new InputOption('dir', InputOption.string, this.directoryResolver.resolve(ENTITY_DIRECTORY)));
        this.options.add(new InputOption('properties', InputOption.array));
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const properties = this.getOption('properties');

        let recipe = new CreateEntity(dir);

        recipe.execute({className: name, properties});
    }

}