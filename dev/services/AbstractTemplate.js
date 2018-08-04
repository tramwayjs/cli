import path from 'path';
import {FileProvider} from "../providers";

export default class AbstractTemplate {
    constructor(pattern, root, versions) {
        this.pattern = pattern;
        this.root = root;
        this.versions = versions;
        this.fileProvider = new FileProvider();
    }

    format(methodName, template, version) {
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

        contents = contents.replace(this.pattern, methodName);

        return contents;
    }

    buildTemplatePath(template, version) {
        return path.join(this.root, template, `v${version}.txt`);
    }

    getLatestVersion(template) {
        return this.versions[template];
    }
}