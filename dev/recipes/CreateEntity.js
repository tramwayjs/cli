import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
import { INDENTATION } from "../config/format";
const {indexing, classes, methods} = templates;
const {MultiClassDirectory} = indexing;
const {ClassTemplate} = classes;
const {GetterSetterTemplate} = methods;

export default class CreateEntity extends Recipe {
    constructor(dir) {
        super();

        this.dir = dir;

        this.classTemplate = new ClassTemplate();
        this.indexTemplate = new MultiClassDirectory(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
        this.methodTemplate = new GetterSetterTemplate();
    }

    execute(data, ...next) {
        const {className, properties} = data;

        if (this.checkClassExistance(className, this.dir)) {
            throw new Error(`${className} already exists in ${this.dir}`);
        }

        this.createClass(className, properties, this.dir);
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

    createClass(className, properties, dir) {
        let contents = this.classTemplate.format(className, "entity");
        
        if (properties) {
            properties = properties.map(property => {
                let getter = this.methodTemplate.format(property, "getter")
                let setter = this.methodTemplate.format(property, "setter");
                return `${getter}\n\n${setter}`.replace(/^/gm, INDENTATION);
            });
            properties = properties.join('\n\n');
            contents = contents.replace('{}', `{\n${properties}\n}`);
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