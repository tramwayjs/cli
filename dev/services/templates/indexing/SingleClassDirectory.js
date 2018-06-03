import DirectoryTemplate from "./DirectoryTemplate";

export default class SingleClassDirectory extends DirectoryTemplate {
    buildImport(className, imports) {
        let newImport = this.moduleGenerationService.addImportLine(className);
        return `${imports}\n${newImport}`;
    }

    buildExport(className, exports) {
        let newExport = this.moduleGenerationService.addExportLine(className);
        return `${exports}\n${newExport}`;
    }

    findImport(index) {
        return this.moduleGenerationService.findLines("import", index);
    }

    findExport(index) {
        return this.moduleGenerationService.findLines("export", index);
    }
}