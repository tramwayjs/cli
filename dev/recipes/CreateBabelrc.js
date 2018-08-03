import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { templates } from '../services';
const {config} = templates;
const {ConfigTemplate} = config;

export default class CreateBabelrc extends Recipe {
    constructor(dir, version) {
        super();

        this.dir = dir;
        this.version = version;

        this.configTemplate = new ConfigTemplate();
        this.fileProvider = new FileProvider();
    }

    execute(data, ...next) {
        if (this.checkBabelrcExistance(this.dir)) {
            throw new Error(`.babelrc already exists in ${this.dir}`);
        }

        this.createConfig(this.dir, this.version);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    checkBabelrcExistance(dir) {
        try {
            return !!this.fileProvider.read(`${dir ? `${dir}/` : ''}.babelrc`);
        } catch (e) {
            return false;
        }
    }

    createConfig(dir, version) {
        let contents = this.configTemplate.format("babelrc", version);
        this.fileProvider.write(dir, '.babelrc', contents, null);
    }
}