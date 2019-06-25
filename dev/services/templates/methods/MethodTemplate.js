import AbstractTemplate from '../../AbstractTemplate';

export default class MethodTemplate extends AbstractTemplate {
    constructor(fileProvider, methods, dirname) {
        super(fileProvider, methods, dirname);
        this.pattern = /METHOD_NAME/g;
    }

    format(methodName, template, version) {
        let contents = super.format(template, version);
        return contents.replace(this.pattern, methodName);
    }
}