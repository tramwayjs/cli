import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {config, indexing} = templates;
const {ConfigTemplate} = config;
const {UnificationTemplate} = indexing;

export default class CreateParameters extends Recipe {
    constructor(dir, environment) {
        super();

        this.dir = dir;
        this.environment = environment;

        this.configTemplate = new ConfigTemplate();
        this.fileProvider = new FileProvider();
        this.moduleGenerationService = new ModuleGenerationService();
        this.indexTemplate = new UnificationTemplate(this.moduleGenerationService);
    }

    execute(data, ...next) {
        if (this.checkExistance(this.dir)) {
            throw new Error(`Parameters config already exists in ${this.dir}`);
        }

        this.createIndex(this.dir, this.environment);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    checkExistance(dir) {
        try {
            return !!this.fileProvider.read(`${dir ? `${dir}/` : ''}index.js`);
        } catch (e) {
            return false;
        }
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