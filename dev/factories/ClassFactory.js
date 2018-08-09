import {ClassExistsError} from '../errors';

export default class ClassFactory {
    constructor(classTemplate, fileProvider, type) {
        this.classTemplate = classTemplate;
        this.fileProvider = fileProvider;
        this.type = type;
    }

    create(name, dir, options = {}) {
        const {
            version,
            modifier = item => item,
            extension,
        } = options;

        this.checkExistance(name, dir);

        let contents = this.classTemplate.format(name, this.type, version);
        contents = modifier(contents);
        this.fileProvider.write(dir, name, contents, extension);
    }

    checkExistance(name, dir = '') {
        try {
            if (this.fileProvider.read(`${dir ? `${dir}/` : ''}${name}.js`)) {
                throw new ClassExistsError(`${name} already exists in ${dir}`); 
            }
        } catch (e) {
            if (e instanceof ClassExistsError) {
                throw e;
            }
        }
    }
}