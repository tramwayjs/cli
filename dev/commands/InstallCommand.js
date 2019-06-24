import {Command, commands, terminal} from 'tramway-command';
import {
    InstallService, 
    DirectoryResolver
} from '../services';
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
     * @param {DirectoryResolver} directoryResolver 
     */
    constructor(
        installService, 
        directoryResolver, 
        default_libraries,
        babel_libraries,
        defaults = {},
        serverRecipe,
        appBatchRecipe,
        appBatchExtraRecipe,
        babelRcRecipe,
        dependencyRecipe,
        routerRecipe,
        parametersRecipe,
        controllerRecipe,
        routeRecipe,
        gitignoreRecipe,
        loggerRecipe,
        winstonRecipe,
    ) {
        super();

        this.installService = installService;
        this.directoryResolver = directoryResolver;
        this.defaults = defaults;
        this.default_libraries = default_libraries;
        this.babel_libraries = babel_libraries;

        this.serverRecipe = serverRecipe;
        this.appBatchRecipe = appBatchRecipe;
        this.appBatchExtraRecipe = appBatchExtraRecipe;
        this.babelRcRecipe = babelRcRecipe;
        this.dependencyRecipe = dependencyRecipe;
        this.routerRecipe = routerRecipe;
        this.parametersRecipe = parametersRecipe;
        this.controllerRecipe = controllerRecipe;
        this.routeRecipe = routeRecipe;
        this.gitignoreRecipe = gitignoreRecipe;
        this.loggerRecipe = loggerRecipe;
        this.winstonRecipe = winstonRecipe;
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

        let progressBar = new ProgressBar('Installing Tramway', 10);

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
            
            this.babelRcRecipe.create();
            progressBar.finish('Adding .babelrc');

            new TimestampLog(`Installing ${babel_libraries.join(', ')}`);

            progressBar.start('Installing babel presets');
            let data = await this.installService.installDev(...babel_libraries);
            progressBar.finish('Installing babel presets');

            new TimestampSuccess(`npm install of babel presets completed successfully \n${data}`);
        } catch(e) {
            new TimestampWarning(e.message.replace('undefined', 'the root of your project'))
        }

        progressBar.start('Creating router setup');
        try {
            this.routerRecipe.create(
                'router',
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY),
            );
        } catch(e) {
            new TimestampError(`Failed to create router setup \n${e.message}`);
        }
        progressBar.finish('Creating router setup');

        progressBar.start('Creating logging setup');

        try {
            this.loggerRecipe.create(
                'logger',
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY),
            );
            this.winstonRecipe.create(
                'winston',
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY),
            );
        } catch(e) {
            new TimestampError(`Failed to create logger setup \n${e.message}`);
        }

        progressBar.finish('Creating logging setup');

        progressBar.start('Creating server setup');
        try {
            this.serverRecipe.create(type, this.directoryResolver.resolve());

            this.appBatchRecipe.create(
                ['app', 'cors', 'port', 'cookieParser'], 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY)
            );

            this.appBatchExtraRecipe.create(
                ['bodyParser', 'methodOverrides'], 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY)
            )

            const functions = [
                {
                    "name": "use",
                    "args": [{"type": "parameter", "key": "_method"}],
                },
                {
                    "name": "use",
                    "args": [{"type": "parameter", "key": "xMethod"}],
                },
                {
                    "name": "use",
                    "args": [{"type": "parameter", "key": "cors"}],
                },
                {
                    "name": "use",
                    "args": [{"type": "parameter", "key": "json"}],
                },
                {
                    "name": "use",
                    "args": [{"type": "parameter", "key": "urlEncoding"}],
                },
                {
                    "name": "use",
                    "args": [{"type": "parameter", "key": "cookieParser"}],
                },
                {
                    "name": "addLogger",
                    "args": [
                        {"type": "service", "key": "logger.middleware"}
                    ]
                }
            ];

            const args = [
                {"type": "service", "key": "router"},
                {"type": "parameter", "key": "app"},
                {"type": "parameter", "key": "port"},
            ];

            this.dependencyRecipe.create(
                'App', 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY),
                {
                    key: 'app', 
                    parentDir: 'tramway-core',
                    constructorArgs: this.prepareArgs(args), 
                    functions: this.prepareFunctionArgs(functions),
                    filename: DEPENDENCY_INJECTION_CORE_FILENAME
                }
            );

            new TimestampSuccess(`Server file successfully created in ${this.directoryResolver.resolve()}`);
        } catch(e) {
            new TimestampError(`Failed to create server setup \n${e.message}`);
        }
        progressBar.finish('Creating server setup');

        progressBar.start('Creating main route');
        try {
            this.parametersRecipe.create(
                'global', 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_DIRECTORY)
            );

            this.controllerRecipe.create(
                'MainController', 
                this.directoryResolver.resolve(CONTROLLER_DIRECTORY),
                {
                    args: [['index']],
                    key: 'controller.main', 
                    parentDir: `../../${CONTROLLER_DIRECTORY}`,
                    filename: DEPENDENCY_INJECTION_CONTROLLERS_FILENAME,
                    diDir: this.directoryResolver.resolve(DEPENDENCY_INJECTION_SERVICES_DIRECTORY),
                    constructorArgs: [
                        `{"type": "service", "key": "router"}`,
                    ].filter(a => a)
                }
            );

            this.routeRecipe.create(
                ROUTES_CONFIG_FILENAME, 
                this.directoryResolver.resolve(DEPENDENCY_INJECTION_PARAMETERS_GLOBAL_DIRECTORY), 
                {
                    action: 'index', 
                    service: 'controller.main',
                    methods: ['get'],
                }
            );
        } catch (e) {
            new TimestampError(`Failed to create main route \n${e.message}`);
        }
        progressBar.finish('Creating main route');

        progressBar.start('Adding .gitignore');
        try {
            this.gitignoreRecipe.create();
        } catch (e) {
            new TimestampWarning(e.message.replace('undefined', 'the root of your project'));
        }
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