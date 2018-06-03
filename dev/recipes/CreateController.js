import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {indexing, classes} = templates;
const {MultiClassDirectory} = indexing;
const {ClassTemplate} = classes;

export default class CreateController {
    constructor() {
        this.classTemplate = new ClassTemplate();
        this.indexTemplate = new MultiClassDirectory(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
    }

    execute(className, dir, ...next) {
        if (this.checkClassExistance(className, dir)) {
            throw new Error(`${className} already exists in ${dir}`);
        }

        this.createClass(className, dir);
        this.createIndex(className, dir);

        let [first, ...rest] = next;
        return first && first.execute(className, dir, ...rest);
    }

    checkClassExistance(className, dir) {
        try {
            return !!this.fileProvider.read(`${dir}/${className}.js`);
        } catch (e) {
            return false;
        }
    }

    createClass(className, dir) {
        let contents = this.classTemplate.format(className, "controller");
        this.fileProvider.write(dir, className, contents);
    }

    createIndex(className, dir) {
        let contents;
        let imports = '';
        let exports = '';

        try {
            contents = this.fileProvider.read(`${dir}/index.js`);
            imports = this.indexTemplate.findImport(contents);
            exports = this.indexTemplate.findExport(contents);
        } catch (e) {
        }

        contents = this.indexTemplate.format(className, imports, exports);

        this.fileProvider.write(dir, "index", contents);
    }
}