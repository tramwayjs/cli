export default class ContainerizedItemRecipe {
    constructor(recipe, dependencyFactory) {
        this.recipe = recipe;
        this.dependencyFactory = dependencyFactory;
    }

    create(name, dir, options = {}) {
        const {key, diDir, parentDir, constructorArgs, functions, filename, ...rest} = options;
        this.recipe.create(name, dir, rest);
        this.dependencyFactory.create(name, diDir, {key, parentDir, constructorArgs, functions, filename});
    }
}