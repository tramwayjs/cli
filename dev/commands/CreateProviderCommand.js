import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateProvider,
    CreateDependency,
} from '../recipes';

import { PROVIDER_DIRECTORY, DEPENDENCY_INJECTION_SERVICES_DIRECTORY, DEPENDENCY_INJECTION_SERVICES_FILENAME } from '../config/defaults';

const {InputOption} = commands;

export default class CreateProviderCommand extends CreateClassCommand {
    configure() {
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(
            new InputOption(
                'dir', 
                InputOption.string, 
                this.directoryResolver.resolve(PROVIDER_DIRECTORY)
            )
        );

        this.options.add(new InputOption('add-dependency-injection', InputOption.boolean));
        this.options.add(new InputOption('key', InputOption.string));
        this.options.add(
            new InputOption(
                'dependency-injection-dir', 
                InputOption.string, 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY)
            )
        );
        this.options.add(new InputOption('dependency-injection-filename', InputOption.string, DEPENDENCY_INJECTION_SERVICES_FILENAME));
        this.options.add(new InputOption('version', InputOption.number));    
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const version = this.getOption('version');

        let recipe = new CreateProvider(dir, version);
        let next = [];

        const shouldAddDependencyInjection = this.getOption('add-dependency-injection');
        const key = this.getOption('key');
        const diDir = this.getOption('dependency-injection-dir');
        const diFilename = this.getOption('dependency-injection-filename');
        
        if (shouldAddDependencyInjection) {
            next.push(new CreateDependency(diDir, diFilename));
        }

        recipe.execute({className: name, key, classDirectory: dir}, ...next);
    }

}