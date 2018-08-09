import CreateClassCommand from './CreateClassCommand';
import {IndexEntryExistsError} from '../errors';
import {commands, terminal} from 'tramway-command';

const {InputOption} = commands;
const {TimestampWarning} = terminal;

export default class CreateApiCommand extends CreateClassCommand {
    constructor(
        recipe, 
        directoryResolver, 
        defaults, 
        routeRecipe, 
        entityRecipe, 
        repositoryRecipe, 
        serviceRecipe, 
        dependencyRecipe, 
        controllerRecipe
    ) {
        super(recipe, directoryResolver, defaults);
        this.routeRecipe = routeRecipe;
        this.entityRecipe = entityRecipe;
        this.repositoryRecipe = repositoryRecipe;
        this.serviceRecipe = serviceRecipe;
        this.dependencyRecipe = dependencyRecipe;
        this.controllerRecipe = controllerRecipe;
    }

    configure() {
        this.args.add((new InputOption('resource', InputOption.string)).isRequired());
        this.options.add(new InputOption('provider', InputOption.string));

        this.prepareAdditionalOptions();
    }

    action() {
        const resource = this.getArgument('resource');
        const provider = this.getOption('provider');

        const entityDirectory = this.getOption('entity-dir');
        const controllerDirectory = this.getOption('controller-dir');
        const routeDirectory = this.getOption('routes-dir');
        const routeFileName = this.getOption('routes-filename');
        const repositoryDirectory = this.getOption('repository-dir');
        const serviceDirectory = this.getOption('services-dir');

        const diDir = this.getOption('dependency-injection-dir');

        const repositoryKey = `repository.${resource.toLowerCase()}`;
        const serviceKey = `service.${resource.toLowerCase()}`;
        const controllerKey = `controller.${resource.toLowerCase()}`;
        const controllerName = `${resource}Controller`;
        const actions = [
            {
                action: 'get',
                methods: ['get'],
            }, 
            {
                action: 'getOne',
                methods: ['get'],
                args: ["id"],
            }, 
            {
                action: 'create',
                methods: ['post'],
            }, 
            {
                action: 'update',
                methods: ['patch'],
                args: ["id"],
            }, 
            {
                action: 'replace',
                methods: ['put'],
                args: ["id"],
            }, 
            {
                action: 'delete',
                methods: ['delete'],
                args: ["id"],
            }
        ];

        this.createEntity(resource, entityDirectory);
        this.createRepository(resource, repositoryKey, repositoryDirectory, provider, diDir);
        this.createService(resource, serviceKey, serviceDirectory, repositoryKey, diDir);
        this.createController(resource, controllerKey, controllerName, controllerDirectory, serviceKey, diDir);
        this.createRoutes(resource, routeDirectory, routeFileName, controllerKey, actions);
    }

    createEntity(resource, entityDirectory) {
        this.entityRecipe.create(
            resource, 
            this.directoryResolver.resolve(entityDirectory)
        );
    }

    createRepository(resource, key, repositoryDirectory, provider, diDir) {
        const className = `${resource}Repository`;

        this.repositoryRecipe.create(
            className, 
            this.directoryResolver.resolve(repositoryDirectory),
        );

        const {DEPENDENCY_INJECTION_REPOSITORIES_FILENAME} = this.defaults;

        this.dependencyRecipe.create(
            className, 
            diDir,
            {
                key, 
                parentDir: `../../${repositoryDirectory}`,
                filename: DEPENDENCY_INJECTION_REPOSITORIES_FILENAME,
                constructorArgs: [
                    provider && `{"type": "service", "key": "${provider}"}`,
                ].filter(a => a)
            }
        );
    }

    createService(resource, key, serviceDirectory, repositoryKey, diDir) {
        const className = `${resource}Service`;
        this.serviceRecipe.create(
            className, 
            this.directoryResolver.resolve(serviceDirectory), 
            {
                args: [['repository']],
            }
        );

        const {DEPENDENCY_INJECTION_SERVICES_FILENAME} = this.defaults;

        this.dependencyRecipe.create(
            className, 
            diDir,
            {
                key, 
                parentDir: `../../${serviceDirectory}`,
                filename: DEPENDENCY_INJECTION_SERVICES_FILENAME,
                constructorArgs: [
                    repositoryKey && `{"type": "service", "key": "${repositoryKey}"}`,
                ].filter(a => a)
            }
        );
    }

    createController(resource, key, controllerName, controllerDirectory, serviceKey, diDir) {
        this.controllerRecipe.create(
            controllerName,
            this.directoryResolver.resolve(controllerDirectory),
            {
                args: [['service']]
            }
        )

        const {DEPENDENCY_INJECTION_CONTROLLERS_FILENAME} = this.defaults;

        this.dependencyRecipe.create(
            controllerName, 
            diDir,
            {
                key, 
                parentDir: `../../${controllerDirectory}`,
                filename: DEPENDENCY_INJECTION_CONTROLLERS_FILENAME,
                constructorArgs: [
                    serviceKey && `{"type": "service", "key": "${serviceKey}"}`,
                ].filter(a => a)
            }
        );
    }

    createRoutes(resource, routeDirectory, routeFileName, controllerKey, actions) {
        actions.forEach(
            ({action, methods, args}) => {
                try {
                    this.routeRecipe.create(
                        routeFileName, 
                        this.directoryResolver.resolve(routeDirectory), 
                        {
                            service: controllerKey,
                            action,
                            path: resource.toLowerCase(),
                            methods,
                            routeArgs: args,
                        }
                    )
                } catch (e) {
                    if (!(e instanceof IndexEntryExistsError)) {
                        throw e;
                    }
                    
                    new TimestampWarning(e.message);
                }
            }
        );
    }

    prepareAdditionalOptions() {
        const { 
            ENTITY_DIRECTORY,
            CONTROLLER_DIRECTORY,
            REPOSITORY_DIRECTORY,
            SERVICE_DIRECTORY,
            ROUTES_CONFIG_FILENAME,
            DEPENDENCY_INJECTION_SERVICES_DIRECTORY, 
            DEPENDENCY_INJECTION_SERVICES_FILENAME, 
            DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY
        } = this.defaults;

        this.options.add(new InputOption('entity-dir', InputOption.string, ENTITY_DIRECTORY));
        this.options.add(new InputOption('controller-dir', InputOption.string, CONTROLLER_DIRECTORY));
        this.options.add(new InputOption('routes-dir', InputOption.string, DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY));
        this.options.add(new InputOption('routes-filename', InputOption.string, ROUTES_CONFIG_FILENAME));
        this.options.add(new InputOption('repository-dir', InputOption.string, REPOSITORY_DIRECTORY));
        this.options.add(new InputOption('services-dir', InputOption.string, SERVICE_DIRECTORY));

        this.options.add(
            new InputOption(
                'dependency-injection-dir', 
                InputOption.string, 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY)
            )
        );
    }
}