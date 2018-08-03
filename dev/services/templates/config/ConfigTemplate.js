import AbstractTemplate from '../../AbstractTemplate';
import {config} from '../../../config/versions';

export default class ConfigTemplate extends AbstractTemplate {
    constructor() {
        super(null, __dirname, config);
    }

    format(template, version) {
        if (!version) {
            version = this.getLatestVersion(template);
        }

        let templatePath = this.buildTemplatePath(template, version)
        let contents;

        try {
            contents = this.fileProvider.read(templatePath);
        } catch (e) {
            throw new Error(`Template ${templatePath} doesn't exist`);
        }

        return contents;
    }
}