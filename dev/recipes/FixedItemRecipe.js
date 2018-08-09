export default class FixedItemRecipe {
    constructor(recipe, params = {}) {
        this.recipe = recipe;
        this.params = params;
    }

    create() {
        const {name, dir, options = {}} = this.params;

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