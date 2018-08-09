import path from 'path';
import {FileProvider} from "../providers";

export default class AbstractTemplate {
    /**
     * @param {FileProvider}
     * @param {number} versions 
     * @param {string} root 
     */
    constructor(fileProvider, versions, root) {
        this.fileProvider = fileProvider;
        this.versions = versions;
        this.root = root;
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

    buildTemplatePath(template, version) {
        return path.join(this.root, template, `v${version}.txt`);
    }

    getLatestVersion(template) {
        return this.versions[template];
    }
}