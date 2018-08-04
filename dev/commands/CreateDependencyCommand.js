import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateDependency, 
} from '../recipes';

const {InputOption} = commands;

export default class CreateDependencyCommand extends CreateClassCommand {
    configure() {
        const { 
            SERVICE_DIRECTORY, 
            DEPENDENCY_INJECTION_SERVICES_FILENAME, 
            DEPENDENCY_INJECTION_SERVICES_DIRECTORY,
        } = this.defaults;

        this.args.add((new InputOption('key', InputOption.string)).isRequired());
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(
            new InputOption(
                'dir', 
                InputOption.string, 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY)
            )
        );
        this.options.add(new InputOption('args', InputOption.array));
        this.options.add(new InputOption('functions', InputOption.array));
        this.options.add(new InputOption('filename', InputOption.string, DEPENDENCY_INJECTION_SERVICES_FILENAME));
        this.options.add(
            new InputOption(
                'classDirectory', 
                InputOption.string, 
                this.directoryResolver.resolve(SERVICE_DIRECTORY)
            )
        );
    }

    action() {
        const key = this.getArgument('key');
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const args = this.getOption('args');
        const functions = this.getOption('functions');
        const filename = this.getOption('filename');
        const classDirectory = this.getOption('classDirectory');

        let recipe = new CreateDependency(dir, filename);

        //className, key, functions, constructorArgs

        let next = [];

        // if (shouldAddDependencyInjection) {
        //     next.push(new CreateRoute(diDir, diFilename));
        // }

        recipe.execute({key, className: name, args, classDirectory}, ...next);
    }

}