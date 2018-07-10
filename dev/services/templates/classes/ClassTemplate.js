import path from 'path';
import {FileProvider} from "../../../providers";
import { versions } from '../../../config';

export default class ClassTemplate {
    constructor() {
        this.fileProvider = new FileProvider();
    }

    format(className, template, version) {
        if (!version) {
            version = this.getLatestVersion(template);
        }

        let templatePath = path.join(__dirname, template, `v${version}.txt`);
        let contents;

        try {
            contents = this.fileProvider.read(templatePath);
        } catch (e) {
            throw new Error(`Template ${templatePath} doesn't exist`);
        }

        contents = contents.replace(/CLASS_NAME/g, className);

        return contents;
    }

    getLatestVersion(template) {
        return versions[template];
    }
}