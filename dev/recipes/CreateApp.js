import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {config, indexing} = templates;
const {ConfigTemplate} = config;

const {MultiClassDirectory} = indexing;

export default class CreateApp extends Recipe {
    constructor(dir, version) {
        super();

        this.dir = dir;
        this.version = version;

        this.configTemplate = new ConfigTemplate();
        this.fileProvider = new FileProvider();
        this.indexTemplate = new MultiClassDirectory(new ModuleGenerationService());
    }

    execute(data, ...next) {
        const {type} = data;

        if (this.checkExistance(this.dir, type)) {
            throw new Error(`${type} config already exists in ${this.dir}`);
        }

        this.createConfig(this.dir, type, this.version);
        this.createIndex(this.dir, type);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    checkExistance(dir, type) {
        try {
            return !!this.fileProvider.read(`${dir ? `${dir}/` : ''}${type}.js`);
        } catch (e) {
            return false;
        }
    }

    createConfig(dir, type, version) {
        let contents = this.configTemplate.format(type, version);
        this.fileProvider.write(dir, type, contents);
    }

    createIndex(dir, filename) {
        let contents;
        let imports = '';
        let exports = '';

        try {
            contents = this.fileProvider.read(`${dir}/index.js`);
            imports = this.indexTemplate.findImport(contents);
            exports = this.indexTemplate.findExport(contents);
        } catch (e) {
            
        }

        contents = this.indexTemplate.format(filename, imports, exports);
        this.fileProvider.write(dir, "index", contents);
    }
}