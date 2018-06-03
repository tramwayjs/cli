import path from 'path';
import {FileProvider} from "../../../providers";

export default class ClassTemplate {
    constructor() {
        this.fileProvider = new FileProvider();
    }

    format(className, template) {
        let templatePath = path.join(__dirname, `${template}.txt`);
        let contents;

        try {
            contents = this.fileProvider.read(templatePath);
        } catch (e) {
            throw new Error(`Template ${templatePath} doesn't exist`);
        }

        contents = contents.replace(/CLASS_NAME/g, className);

        return contents;
    }
}