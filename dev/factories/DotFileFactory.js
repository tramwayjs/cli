import ConfigFactory from "./ConfigFactory";
import {ConfigExistsError} from '../errors';

export default class DotFileFactory extends ConfigFactory {
    create(type, dir, options = {}) {
        const {
            version,
            overwrite,
        } = options;

        if (!overwrite) {
            this.checkExistance(type, dir);
        }

        let contents = this.configTemplate.format(type, version);
        this.fileProvider.write(dir, `.${type}`, contents, null);
    }

    checkExistance(type, dir) {
        const filename = `.${type}`;
        try {
            if (this.fileProvider.read(`${dir ? `${dir}/` : ''}${filename}`)) {
                throw new ConfigExistsError(type, dir); 
            }
        } catch (e) {
            if (e instanceof ConfigExistsError) {
                throw e;
            }
        }
    }
}