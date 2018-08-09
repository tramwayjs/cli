export default class SequentialRecipe {
    constructor() {
        this.recipes = [];
    }

    create(name, dir, options = {}) {
        this.recipes.forEach((recipe, params) => {
            let {name, dir, options: opts} = params;
            opts = Object.assign(opts, options);
            const {errorHandler} = opts;

            try {
                recipe.create(name, dir, opts);
            } catch (e) {
                if (errorHandler) {
                    errorHandler(e);
                }
            }
        })
    }

    addRecipe(recipe, params = {}) {
        this.recipes.push({recipe, params});
        return this;
    }
}