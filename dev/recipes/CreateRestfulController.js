import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
import { INDENTATION } from "../config/format";
const {indexing, classes, methods} = templates;
const {MultiClassDirectory} = indexing;
const {ClassTemplate} = classes;
const {MethodTemplate} = methods;

export default class CreateRestfulController extends Recipe {
    constructor(dir, version) {
        super();

        this.dir = dir;
        this.version = version;

        this.classTemplate = new ClassTemplate();
        this.indexTemplate = new MultiClassDirectory(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
        this.methodTemplate = new MethodTemplate();
    }

    execute(data, ...next) {
        const {className} = data;

        if (this.checkClassExistance(className, this.dir)) {
            throw new Error(`${className} already exists in ${this.dir}`);
        }

        this.createClass(className, this.dir, this.version);
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

    createClass(className, dir, version) {
        let contents = this.classTemplate.format(className, "restfulcontroller", version);
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