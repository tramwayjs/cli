export default class FixedItemRecipe {
    constructor(recipe, params = {}) {
        this.recipe = recipe;
        this.params = params;
    }

    create(params = {}) {
        const {name, dir, options = params} = this.params;

        this.recipe.create(
            this.prepareName(name), 
            dir, 
            options
        );
    }

    prepareName(name) {
        if ('string' === typeof name) {
            return name;
        }

        if (!Array.isArray(name)) {
            return Object.values(name);
        }

        return name;
    }
}