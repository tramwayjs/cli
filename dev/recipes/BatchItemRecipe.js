export default class BatchItemRecipe {
    constructor(recipe) {
        this.recipe = recipe;
    }

    create(names, dir, options) {
        names.forEach(name => this.recipe.create(name, dir, options));
    }
}