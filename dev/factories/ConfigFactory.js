import {ConfigExistsError} from '../errors';

export default class ConfigFactory {
    constructor(configTemplate, fileProvider) {
        this.configTemplate = configTemplate;
        this.fileProvider = fileProvider;
    }

    create(type, dir, options = {}) {
        const {
            version,
            extension = 'js',
        } = options;

        this.checkExistance(type, dir, extension);

        let contents = this.configTemplate.format(type, version);
        this.fileProvider.write(dir, type, contents);
    }

    checkExistance(type, dir, extension = 'js') {
        const filename = `${type}${extension ? `.${extension}` : ''}`;
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