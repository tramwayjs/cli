export default class DirectoryTemplate {
    constructor(moduleGenerationService) {
        this.moduleGenerationService = moduleGenerationService;
    }

    format(className, imports = '', exports = '') {
        let importSection = this.buildImport(className, imports);
        let exportSection = this.buildExport(className, exports);

        return `${importSection}\n\n${exportSection}`;
    }
}