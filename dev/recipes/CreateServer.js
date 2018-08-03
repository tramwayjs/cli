import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { templates } from '../services';
const {server} = templates;
const {ServerTemplate} = server;

export default class CreateServer extends Recipe {
    constructor(dir, version) {
        super();

        this.dir = dir;
        this.version = version;

        this.serverTemplate = new ServerTemplate();
        this.fileProvider = new FileProvider();
    }

    execute(data, ...next) {
        const {type} = data;

        if (this.checkExistance(this.dir)) {
            throw new Error(`Server setup already exists in ${this.dir}`);
        }

        this.create(type, this.dir, this.version);

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

    create(type, dir, version) {
        let contents = this.serverTemplate.format(type, version);
        this.fileProvider.write(dir, 'index', contents);
    }
}