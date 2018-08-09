import {ServerSetupExistsError} from '../errors';

export default class ServerFactory {
    constructor(serverTemplate, fileProvider) {
        this.serverTemplate = serverTemplate;
        this.fileProvider = fileProvider;
    }

    create(type, dir, options = {}) {
        const {
            version,
        } = options;

        this.checkExistance(dir);

        let contents = this.serverTemplate.format(type, version);
        this.fileProvider.write(dir, 'index', contents);
    }

    checkExistance(dir) {
        try {
            if (this.fileProvider.read(`${dir ? `${dir}/` : ''}index.js`)) {
                throw new ServerSetupExistsError(dir); 
            }
        } catch (e) {
            if (e instanceof ServerSetupExistsError) {
                throw e;
            }
        }
    }
}