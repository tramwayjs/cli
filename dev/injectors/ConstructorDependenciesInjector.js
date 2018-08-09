export default class ControllerActionsInjector {
    constructor(methodTemplate, format) {
        this.methodTemplate = methodTemplate;
        this.format = format;
    }

    inject(contents, dependencies = []) {
        if (!dependencies || !dependencies.length) {
            return contents;
        }

        const {INDENTATION} = this.format;

        let constructor = this.methodTemplate.format(null, "constructor", 1);
        constructor = constructor.replace('()', `(${dependencies.join(', ')})`);
        dependencies = dependencies.map(dependency => `this.${dependency} = ${dependency};`);
        dependencies = dependencies.join('\n');
        constructor = constructor.replace('{}', `{\n${dependencies.replace(/^/gm, INDENTATION)}\n}`);
        return contents.replace('{}', `{\n${constructor.replace(/^/gm, INDENTATION)}\n}`);
    }
}