export default class ClassPropertiesInjector {
    constructor(methodTemplate, format) {
        this.methodTemplate = methodTemplate;
        this.format = format;
    }

    inject(contents, properties = []) {
        if (!properties.length) {
            return contents;
        }
        
        const {INDENTATION} = this.format;

        properties = properties.map(property => {
            let getter = this.methodTemplate.format(property, "getter")
            let setter = this.methodTemplate.format(property, "setter");
            return `${getter}\n\n${setter}`.replace(/^/gm, INDENTATION);
        });
        properties = properties.join('\n\n');
        return contents.replace('{}', `{\n${properties}\n}`);
    }
}