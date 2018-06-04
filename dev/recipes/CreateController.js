import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {indexing, classes, methods} = templates;
const {MultiClassDirectory} = indexing;
const {ClassTemplate} = classes;
const {MethodTemplate} = methods;

export default class CreateController extends Recipe {
    constructor(dir) {
        super();

        this.dir = dir;

        this.classTemplate = new ClassTemplate();
        this.indexTemplate = new MultiClassDirectory(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
        this.methodTemplate = new MethodTemplate();
    }

    execute(data, ...next) {
        const {className, actions} = data;

        if (this.checkClassExistance(className, this.dir)) {
            throw new Error(`${className} already exists in ${this.dir}`);
        }

        this.createClass(className, actions, this.dir);
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

    createClass(className, methods, dir) {
        let contents = this.classTemplate.format(className, "controller");
        
        if (methods) {
            methods = methods.map(method => this.methodTemplate.format(method, "controllerAction").replace(/^/gm, "    "));
            methods = methods.join('\n\n');
            contents = contents.replace('{}', `{\n${methods}\n}`);
        }

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