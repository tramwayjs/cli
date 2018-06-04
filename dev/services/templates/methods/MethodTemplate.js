import path from 'path';
import {FileProvider} from "../../../providers";

export default class MethodTemplate {
    constructor() {
        this.fileProvider = new FileProvider();
    }

    format(methodName, template) {
        let templatePath = path.join(__dirname, `${template}.txt`);
        let contents;

        try {
            contents = this.fileProvider.read(templatePath);
        } catch (e) {
            throw new Error(`Template ${templatePath} doesn't exist`);
        }

        contents = contents.replace(/METHOD_NAME/g, methodName);

        return contents;
    }
}