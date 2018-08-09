export default class ControllerActionsInjector {
    constructor(methodTemplate, format) {
        this.methodTemplate = methodTemplate;
        this.format = format;
    }

    inject(contents, methods = [], version) {
        if (!methods.length) {
            return contents;
        }

        const {INDENTATION} = this.format;

        methods = methods
            .map(method => this.methodTemplate.format(method, "controllerAction", version).replace(/^/gm, INDENTATION))
            .join('\n\n');
        return contents.replace('{}', `{\n${methods}\n}`);
    }
}