export default class IncludesDependencyRecipe {
    constructor(recipe, installService, libraries = []) {
        this.recipe = recipe;
        this.installService = installService;
        this.libraries = Array.isArray(libraries) ? libraries : Object.values(libraries);
    }

    create(name, dir, options = {}) {
        let libraries = this.installService.gatherLibraries(...this.libraries);
        libraries = libraries.filter(library => !this.installService.isInstalled(library));

        if (!libraries.length) {
            return this.recipe.create(name, dir, options);
        }

        this.installService.install(...libraries)
            .then(() => this.recipe.create(name, dir, options));
    }
}