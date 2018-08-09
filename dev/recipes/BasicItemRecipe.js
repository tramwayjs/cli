export default class BasicItemRecipe {
    constructor(factory, injector) {
        this.factory = factory;
        this.injector = injector;
    }

    create(name, dir, options = {}) {
        let {version, modifier, args = [], extension, ...rest} = options;

        if (!modifier) {
            if (this.injector) {
                modifier = content => this.injector.inject(content, ...args);
            } else {
                modifier = content => content;
            }
        }

        this.factory.create(name, dir, {version, modifier, extension, ...rest});
    }
}