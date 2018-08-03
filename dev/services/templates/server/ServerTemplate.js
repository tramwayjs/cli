import AbstractTemplate from '../../AbstractTemplate';
import {server} from '../../../config/versions';

export default class ServerTemplate extends AbstractTemplate {
    constructor() {
        super(null, __dirname, server);
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