export default class IndexedItemRecipe {
    constructor(recipe, indexFactory) {
        this.recipe = recipe;
        this.indexFactory = indexFactory;
    }

    create(name, dir, options = {}) {
        this.recipe.create(name, dir, options);
        this.indexFactory.create(name, dir);
    }
}