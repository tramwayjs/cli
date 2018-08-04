import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {config, indexing} = templates;
const {ConfigTemplate} = config;
const {ConvergenceTemplate} = indexing;

export default class CreateRouterConfig extends Recipe {
    constructor(dir, version, filename = 'router') {
        super();

        this.dir = dir;
        this.version = version;
        this.filename = filename;

        this.configTemplate = new ConfigTemplate();
        this.fileProvider = new FileProvider();
        this.moduleGenerationService = new ModuleGenerationService();
        this.indexTemplate = new ConvergenceTemplate(this.moduleGenerationService);
    }

    execute(data, ...next) {
        if (this.checkExistance(this.dir)) {
            throw new Error(`Router config already exists in ${this.dir}`);
        }

        this.createIndex(this.dir, this.filename);
        this.createConfig(this.dir, this.version);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    checkExistance(dir) {
        try {
            return !!this.fileProvider.read(`${dir ? `${dir}/` : ''}${this.filename}.js`);
        } catch (e) {
            return false;
        }
    }

    createConfig(dir, version) {
        let contents = this.configTemplate.format("router", version);
        this.fileProvider.write(dir, this.filename, contents);
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