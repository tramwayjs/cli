import DirectoryTemplate from "./DirectoryTemplate";

export default class UnificationTemplate extends DirectoryTemplate {
    buildImport(group, imports) {
        let newImport = this.moduleGenerationService.addImportGroup(group);
        return `${imports}\n${newImport}`;
    }

    buildExport(group, exports) {
        return this.moduleGenerationService.appendToGroup("export", group, exports);
    }

    findImport(index) {
        return this.moduleGenerationService.findLastOfGroup("import", index);
    }

    findExport(index) {
        return this.moduleGenerationService.findLastOfGroup("export", index);
    }
}