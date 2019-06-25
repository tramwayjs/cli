import path from 'path';
import {FileProvider} from "../../../providers";

export default class DependencyTemplate {
    /**
     * 
     * @param {FileProvider} fileProvider 
     */
    constructor(fileProvider, dirname) {
        this.fileProvider = fileProvider;
        this.dirname = dirname;
    }

    formatDependency(type, key) {
        let templatePath = path.join(this.dirname, `dependency.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/TYPE/g, type).replace(/KEY/g, key);
    }

    format(className, key) {
        let templatePath = path.join(this.dirname, `service.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/CLASS_NAME/g, className).replace(/KEY/g, key);
    }

    create() {
        let templatePath = path.join(this.dirname, `services.txt`);
        return this.fileProvider.read(templatePath);
    }

    formatFunction(name) {
        let templatePath = path.join(this.dirname, `function.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/FUNCTION_NAME/g, name);
    }

    formatIndex(dir) {
        let templatePath = path.join(this.dirname, `index.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/SERVICES_DIR/g, dir);
    }
}