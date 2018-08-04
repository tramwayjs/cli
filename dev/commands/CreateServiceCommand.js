import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateService, 
} from '../recipes';

const {InputOption} = commands;

export default class CreateServiceCommand extends CreateClassCommand {
    configure() {
        const { 
            SERVICE_DIRECTORY, 
            DEPENDENCY_INJECTION_SERVICES_FILENAME, 
            DEPENDENCY_INJECTION_SERVICES_DIRECTORY 
        } = this.defaults;

        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(
            new InputOption(
                'dir', 
                InputOption.string, 
                this.directoryResolver.resolve(SERVICE_DIRECTORY)
            )
        );
        this.options.add(new InputOption('dependencies', InputOption.array));
        this.options.add(new InputOption('add-dependency-injection', InputOption.boolean));
        this.options.add(
            new InputOption(
                'dependency-injection-dir', 
                InputOption.string, 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY)
            )
        );
        this.options.add(
            new InputOption(
                'dependency-injection-filename', 
                InputOption.string, 
                DEPENDENCY_INJECTION_SERVICES_FILENAME
            )
        );
        this.options.add(new InputOption('version', InputOption.number));
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const shouldAddDependencyInjection = this.getOption('add-dependency-injection');
        const dependencies = this.getOption('dependencies');
        const diDir = this.getOption('dependency-injection-dir');
        const diFilename = this.getOption('dependency-injection-filename');
        const version = this.getOption('version');

        let recipe = new CreateService(dir, version);

        let next = [];

        // if (shouldAddDependencyInjection) {
        //     next.push(new CreateRoute(diDir, diFilename));
        // }

        recipe.execute({className: name, dependencies}, ...next);
    }

}