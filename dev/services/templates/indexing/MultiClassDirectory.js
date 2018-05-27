import DirectoryTemplate from "./DirectoryTemplate";

export default class MultiClassDirectory extends DirectoryTemplate {
    buildImport(className, imports) {
        let newImport = this.moduleGenerationService.addImportLine(className);
        return `${imports}\n${newImport}`;
    }

    buildExport(className, exports) {
        return this.moduleGenerationService.appendToGroup(className, exports);
    }
}