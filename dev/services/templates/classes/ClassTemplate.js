import path from 'path';
import {FileProvider} from "../../../providers";

export default class ClassTemplate {
    constructor() {
        this.fileProvider = new FileProvider();
    }

    format(className, template) {
        let templatePath = path.join(__dirname, `${template}.txt`);

        let contents = this.fileProvider.read(templatePath);

        contents = contents.replace(/CLASS_NAME/g, className);
        console.log(contents, templatePath);
    }
}