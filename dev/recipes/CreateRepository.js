import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {indexing, classes} = templates;
const {MultiClassDirectory} = indexing;
const {ClassTemplate} = classes;

export default class CreateRepository extends Recipe {
    constructor(dir) {
        super();

        this.dir = dir;

        this.classTemplate = new ClassTemplate();
        this.indexTemplate = new MultiClassDirectory(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
    }

    execute(data, ...next) {
        const {className} = data;

        if (this.checkClassExistance(className, this.dir)) {
            throw new Error(`${className} already exists in ${this.dir}`);
        }

        this.createClass(className, this.dir);
        this.createIndex(className, this.dir);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    checkClassExistance(className, dir) {
        try {
            return !!this.fileProvider.read(`${dir}/${className}.js`);
        } catch (e) {
            return false;
        }
    }

    createClass(className, dir) {
        let contents = this.classTemplate.format(className, "repository");
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