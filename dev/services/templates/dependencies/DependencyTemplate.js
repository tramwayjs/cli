import path from 'path';
import {FileProvider} from "../../../providers";

export default class DependencyTemplate {
    constructor() {
        this.fileProvider = new FileProvider();
    }

    formatDependency(type, key) {
        let templatePath = path.join(__dirname, `dependency.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/TYPE/g, type).replace(/KEY/g, key);
    }

    format(className, key) {
        let templatePath = path.join(__dirname, `service.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/CLASS_NAME/g, className).replace(/KEY/g, key);
    }

    create() {
        let templatePath = path.join(__dirname, `services.txt`);
        return this.fileProvider.read(templatePath);
    }

    formatFunction(name) {
        let templatePath = path.join(__dirname, `function.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/FUNCTION_NAME/g, name);
    }

    formatIndex(dir) {
        let templatePath = path.join(__dirname, `index.txt`);
        let contents = this.fileProvider.read(templatePath);
        return contents.replace(/SERVICES_DIR/g, dir);
    }
}