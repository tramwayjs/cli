import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

const {InputOption} = commands;

export default class CreateServiceCommand extends CreateClassCommand {
    constructor(recipe, dependencyRecipe, directoryResolver, defaults = {}) {
        super(recipe, directoryResolver, defaults);
        this.dependencyRecipe = dependencyRecipe;
    }
    
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
        this.options.add(new InputOption('key', InputOption.string));
    }

    action() {
        const name = this.getArgument('name');
        const dir = this.getOption('dir');
        const shouldAddDependencyInjection = this.getOption('add-dependency-injection');
        const dependencies = this.getOption('dependencies');
        const diDir = this.getOption('dependency-injection-dir');
        const diFilename = this.getOption('dependency-injection-filename');
        const version = this.getOption('version');
        const key = this.getOption('key');

        this.recipe.create(name, dir, {
            version, 
            args: [dependencies],
        });

        if (shouldAddDependencyInjection) {
            if (!key) {
                key = `service.${name.toLowerCase()}`;
            }
            
            const args = dependencies.map(dependency => {
                return `{"type": "service", "key": "${provider}"}`
            });

            this.dependencyRecipe.create(
                name, 
                diDir,
                {
                    key, 
                    parentDir: dir,
                    constructorArgs: args, 
                    filename: diFilename,
                }
            );
        }

    }

}