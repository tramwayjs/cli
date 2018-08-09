import AbstractTemplate from '../../AbstractTemplate';

export default class ClassTemplate extends AbstractTemplate {
    constructor(fileProvider, classes) {
        super(fileProvider, classes, __dirname, );
        this.pattern = /CLASS_NAME/g;
    }

    format(methodName, template, version) {
        let contents = super.format(template, version);
        return contents.replace(this.pattern, methodName);
    }
}