import {Command, commands, terminal} from 'tramway-command';
import {
    InstallService, 
    DirectoryResolver
} from '../services';
import { 
    CreateBabelrc, 
    CreateServer, 
    CreateDependency,
    CreateRouterConfig,
    CreateParameters,
    CreateRoute,
    CreateController,
    CreateApp,
    CreateGitignore,
} from '../recipes';
const {InputOption} = commands;
const {
    TimestampSuccess, 
    TimestampError, 
    TimestampLog, 
    TimestampWarning, 
    ProgressBar
} = terminal;

export default class InstallCommand extends Command {
    /**
     * 
     * @param {InstallService} installService 
     * @param {DependencyResolver} dependencyResolver 
     */
    constructor(
        installService, 
        dependencyResolver, 
        default_libraries,
        babel_libraries,
        defaults = {}
    ) {
        super();

        this.installService = installService;
        this.directoryResolver = dependencyResolver;
        this.defaults = defaults;
        this.default_libraries = default_libraries;
        this.babel_libraries = babel_libraries;
    }

    configure() {
        this.args.add(new InputOption('services', InputOption.array));
        this.options.add(new InputOption('type', InputOption.string, 'api'));
    }

    async action() {
        let services = this.getArgument('services');
        const type = this.getOption('type');

        const { 
            DEV_DIRECTORY,
            DEPENDENCY_INJECTION_SERVICES_DIRECTORY,
            DEPENDENCY_INJECTION_SERVICES_FILENAME,
            DEPENDENCY_INJECTION_CORE_FILENAME,
            DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY,
            ROUTES_CONFIG_FILENAME,
            DEPENDENCY_INJECTION_PARAMETERS_DIRECTORY,
            DEPENDENCY_INJECTION_CONTROLLERS_FILENAME,
            CONTROLLER_DIRECTORY,
        } = this.defaults;

        let progressBar = new ProgressBar('Installing Tramway', 9);

        let {default_libraries, babel_libraries} = this;
        default_libraries = Array.isArray(default_libraries) ? default_libraries : Object.values(default_libraries);
        babel_libraries = Array.isArray(babel_libraries) ? babel_libraries : Object.values(babel_libraries);

        if (!services.length) {
            services = default_libraries;
        }

        let packages = [];

        try {
            progressBar.start('Gathering packages');
            packages = this.installService.gatherLibraries(...services);
            progressBar.finish('Gathering packages');
        } catch (e) {
            new TimestampError(e.message);
            return process.exit(1);
        }

        new TimestampLog(`Installing ${packages.join(', ')}`);

        try {
            progressBar.start('Installing packages');
            let data = await this.installService.install(...packages);
            progressBar.finish('Installing packages');
            new TimestampSuccess(`npm install completed successfully \n${data}`);
        } catch (e) {
            new TimestampError(`npm install failed \n${e.message}`);
            return process.exit(1);
        }

        try {
            progressBar.start('Adding .babelrc');
            new CreateBabelrc().execute();
            progressBar.finish('Adding .babelrc');

            new TimestampLog(`Installing ${babel_libraries.join(', ')}`);

            progressBar.start('Installing babel presets');
            let data = await this.installService.installDev(...babel_libraries);
            progressBar.finish('Installing babel presets');

            new TimestampSuccess(`npm install of babel presets completed successfully \n${data}`);
        } catch(e) {
            new TimestampWarning(e.message.replace('undefined', 'the root of your project'))
        }

        try {
            progressBar.start('Creating router setup');
            new CreateRouterConfig(
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY)
            ).execute();

            progressBar.finish('Creating router setup');
        } catch(e) {
            new TimestampError(`Failed to create router setup \n${e.message}`);
        }

        try {
            progressBar.start('Creating server setup');
            
            new CreateServer(
                this.directoryResolver.resolve()
            ).execute({
                type,
            });

            let createApp = new CreateApp(
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY),
            );

            createApp.execute({type: 'app'});
            createApp.execute({type: 'cors'});
            createApp.execute({type: 'port'});

            const functions = [
                {
                    name: 'use', 
                    args: [
                        {"type": "parameter", "key": "cors"},
                    ]
                }
            ];

            const args = [
                {"type": "service", "key": "router"},
                {"type": "parameter", "key": "app"},
                {"type": "parameter", "key": "port"},
            ];

            new CreateDependency(
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY),
                DEPENDENCY_INJECTION_CORE_FILENAME
            ).execute({
                className: 'App', 
                key: 'app', 
                classDirectory: 'tramway-core', 
                args: this.prepareArgs(args), 
                functions: this.prepareFunctionArgs(functions),
            });

            progressBar.finish('Creating server setup');

            new TimestampSuccess(`Server file successfully created in ${this.directoryResolver.resolve()}`);
        } catch(e) {
            new TimestampError(`Failed to create server setup \n${e.message}`);
        }

        try {
            progressBar.start('Creating main route');

            new CreateParameters(
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_DIRECTORY),
                'global'
            ).execute();

            const controllerConfig = {
                actions: ['index'],
                className: 'MainController',
            };

            new CreateController(
                this.directoryResolver.resolve(CONTROLLER_DIRECTORY)
            ).execute(controllerConfig);

            new CreateDependency(
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY),
                DEPENDENCY_INJECTION_CONTROLLERS_FILENAME
            ).execute({
                className: 'MainController', 
                key: 'controller.main', 
                classDirectory: `../../${CONTROLLER_DIRECTORY}`,
            });

            new CreateRoute(
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY), 
                ROUTES_CONFIG_FILENAME
            ).execute({
                action: 'index', 
                service: 'controller.main',
                action: 'index',
                methods: ['get'],
            });

            progressBar.finish('Creating main route');
        } catch (e) {
            new TimestampError(`Failed to create main route \n${e.message}`);
        }

        progressBar.start('Adding .gitignore');
        new CreateGitignore().execute();
        progressBar.finish('Adding .gitignore');
    }



    prepareFunctionArgs(dependencies) {
        return dependencies.map(({name, args}) => {
            return {
                name, 
                args: this.prepareArgs(args),
            };
        });
    }

    prepareArgs(dependencies) {
        return dependencies.map(args => JSON.stringify(args).replace(/\":\"/g, `": "`).replace(/\",\"/g, `", "`));
    }
}