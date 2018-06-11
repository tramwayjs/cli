import {Command, commands} from 'tramway-command';
import path from 'path';

import { 
    CreateRepository,
    CreateDependency,
} from '../recipes';

import { REPOSITORY_DIRECTORY, DEPENDENCY_INJECTION_SERVICES_DIRECTORY, DEPENDENCY_INJECTION_SERVICES_FILENAME } from '../config/defaults';

const {InputOption} = commands;

export default class CreateRepositoryCommand extends Command {
    constructor() {
        super();
    }

    configure() {
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(new InputOption('dir', InputOption.string, REPOSITORY_DIRECTORY));

        this.options.add(new InputOption('add-dependency-injection', InputOption.boolean));
        this.options.add(new InputOption('key', InputOption.string));
        this.options.add(new InputOption('connection', InputOption.string));
        this.options.add(new InputOption('dependency-injection-dir', InputOption.string, DEPENDENCY_INJECTION_SERVICES_DIRECTORY));
        this.options.add(new InputOption('dependency-injection-filename', InputOption.string, DEPENDENCY_INJECTION_SERVICES_FILENAME));
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');

        let recipe = new CreateRepository(dir);
        let next = [];

        const shouldAddDependencyInjection = this.getOption('add-dependency-injection');
        const key = this.getOption('key');
        const connection = this.getOption('connection');
        const diDir = this.getOption('dependency-injection-dir');
        const diFilename = this.getOption('dependency-injection-filename');
        
        if (shouldAddDependencyInjection) {
            next.push(new CreateDependency(diDir, diFilename));
        }

        recipe.execute({className: name, key, classDirectory: dir, args: connection && [`{"type": "service", "key": "${connection}"}`]}, ...next);
    }

}