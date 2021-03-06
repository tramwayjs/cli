import path from 'path';
import MethodTemplate from './MethodTemplate';

export default class GetterSetterTemplate extends MethodTemplate {
    constructor(fileProvider, methods, dirname) {
        super(fileProvider, methods, dirname);
    }

    format(paramName, template) {
        let templatePath = path.join(this.root, template, `v1.txt`);
        let contents;

        try {
            contents = this.fileProvider.read(templatePath);
        } catch (e) {
            throw new Error(`Template ${templatePath} doesn't exist`);
        }

        contents = contents
            .replace(/U_PROPERTY_NAME/g, this.capitalize(paramName))
            .replace(/PROPERTY_NAME/g, paramName);

        return contents;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}