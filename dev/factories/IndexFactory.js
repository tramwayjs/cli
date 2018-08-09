import {IndexFileExistsError, IndexEntryExistsError} from '../errors';

export default class IndexFactory {
    constructor(indexTemplate, fileProvider) {
        this.indexTemplate = indexTemplate;
        this.fileProvider = fileProvider;
    }

    create(item, dir, options = {}) {
        const {
            unique = true,
            throwOnExistance = false,
        } = options;

        if (throwOnExistance) {
            this.checkExistance(dir);
        }

        let contents;
        let imports = '';
        let exports = '';

        try {
            contents = this.fileProvider.read(`${dir}/index.js`);
            imports = this.indexTemplate.findImport(contents);
            exports = this.indexTemplate.findExport(contents);
        } catch (e) {
        }

        if (unique && imports.includes(`./${item}`)) {
            throw new IndexEntryExistsError();
        }

        contents = this.indexTemplate.format(item, imports, exports);

        this.fileProvider.write(dir, "index", contents);
    }

    checkExistance(dir) {
        try {
            if (this.fileProvider.read(`${dir ? `${dir}/` : ''}index.js`)) {
                throw new IndexFileExistsError(dir);
            }
        } catch (e) {
            if (e instanceof IndexFileExistsError) {
                throw e;
            }
        }
    }
}