import CreateClassCommand from './CreateClassCommand';
import {commands} from 'tramway-command';

import { 
    CreateEntity,
    CreateRepository,
    CreateDependency,
    CreateService,
    CreateController,
    CreateRoute,
} from '../recipes';

import { 
    ENTITY_DIRECTORY,
    CONTROLLER_DIRECTORY,
    CONFIG_DIRECTORY,
    REPOSITORY_DIRECTORY,
    SERVICE_DIRECTORY,
    ROUTES_CONFIG_FILENAME,
    DEPENDENCY_INJECTION_SERVICES_DIRECTORY, 
    DEPENDENCY_INJECTION_SERVICES_FILENAME 
} from '../config/defaults';

const {InputOption} = commands;

export default class CreateApiCommand extends CreateClassCommand {
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
        const diFilename = this.getOption('dependency-injection-filename');

        const repositoryKey = `repository.${resource.toLowerCase()}`;
        const serviceKey = `service.${resource.toLowerCase()}`;
        let createDependency = new CreateDependency(this.directoryResolver.resolve(diDir), diFilename);
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
        this.createRepository(resource, repositoryKey, repositoryDirectory, createDependency, provider);
        this.createService(resource, serviceKey, serviceDirectory, repositoryKey, createDependency);
        this.createController(resource, controllerName, controllerDirectory, actions);
        this.createRoutes(resource, routeDirectory, routeFileName, controllerName, actions);
    }

    createEntity(resource, entityDirectory) {
        (new CreateEntity(this.directoryResolver.resolve(entityDirectory)))
            .execute(
                {
                    className: resource
                }
            );
    }

    createRepository(resource, repositoryKey, repositoryDirectory, createDependency, provider) {
        (new CreateRepository(this.directoryResolver.resolve(repositoryDirectory)))
            .execute(
                {
                    className: `${resource}Repository`, 
                    key: repositoryKey, 
                    classDirectory: `../../${repositoryDirectory}`, 
                    args: provider && [`{"type": "service", "key": "${provider}"}`]
                },
                createDependency
            );
    }

    createService(resource, serviceKey, serviceDirectory, repositoryKey, createDependency) {
        (new CreateService(this.directoryResolver.resolve(serviceDirectory)))
            .execute(
                {
                    className: `${resource}Service`, 
                    key: serviceKey, 
                    classDirectory: `../../${serviceDirectory}`, 
                    args: [`{"type": "service", "key": "${repositoryKey}"}`]
                },
                createDependency
            );
    }

    createController(resource, controllerName, controllerDirectory, actions) {
        (new CreateController(this.directoryResolver.resolve(controllerDirectory)))
            .execute(
                {
                    className: controllerName, 
                    actions: actions.map(({action}) => action)
                }
            );
    }

    createRoutes(resource, routeDirectory, routeFileName, controllerName, actions) {
        let createRoute = new CreateRoute(this.directoryResolver.resolve(routeDirectory), routeFileName);

        actions.forEach(({action, methods, args}) => createRoute.execute(
            {
                className: controllerName, 
                path: resource.toLowerCase(),
                action,
                methods,
                args
            }
        ));
    }

    prepareAdditionalOptions() {
        this.options.add(new InputOption('entity-dir', InputOption.string, ENTITY_DIRECTORY));
        this.options.add(new InputOption('controller-dir', InputOption.string, CONTROLLER_DIRECTORY));
        this.options.add(new InputOption('routes-dir', InputOption.string, CONFIG_DIRECTORY));
        this.options.add(new InputOption('routes-filename', InputOption.string, ROUTES_CONFIG_FILENAME));
        this.options.add(new InputOption('repository-dir', InputOption.string, REPOSITORY_DIRECTORY));
        this.options.add(new InputOption('services-dir', InputOption.string, SERVICE_DIRECTORY));

        this.options.add(
            new InputOption(
                'dependency-injection-dir', 
                InputOption.string, 
                DEPENDENCY_INJECTION_SERVICES_DIRECTORY
            )
        );
        this.options.add(
            new InputOption(
                'dependency-injection-filename', 
                InputOption.string, 
                DEPENDENCY_INJECTION_SERVICES_FILENAME
            )
        );
    }
}