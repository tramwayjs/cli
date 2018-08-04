export default class InstallService {
    constructor(packageManagementProvider, serviceLibraryResolver) {
        this.packageManagementProvider = packageManagementProvider;
        this.serviceLibraryResolver = serviceLibraryResolver;
    }

    gatherLibraries(...services) {
        return services.reduce((result, service) => {
            let {library, dependencies} = this.serviceLibraryResolver.getLibrary(service);
            dependencies = Array.isArray(dependencies) ? dependencies : Object.values(dependencies);
            let list = this.buildLibrariesList({library, dependencies});
            return [...result, ...list].filter((value, index, self) => index === self.indexOf(value));
        }, []);
    }

    buildLibrariesList({library, dependencies = []}) {
        if (0 === dependencies.length) {
            return [library];
        }

        dependencies = dependencies.reduce((result, {library, dependencies}) => {
            dependencies = Array.isArray(dependencies) ? dependencies : Object.values(dependencies);
            let list = this.buildLibrariesList({library, dependencies});
            return [...result, ...list];
        }, []);
        
        return [library, ...dependencies].filter((value, index, self) => index === self.indexOf(value));
    }

    async install(...components) {
        return await this.packageManagementProvider.install(...components);
    }

    async installDev(...components) {
        return await this.packageManagementProvider.installDev(...components);
    }
}