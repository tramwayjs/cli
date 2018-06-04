import DirectoryTemplate from "./DirectoryTemplate";

export default class DependencyExposure extends DirectoryTemplate {
    buildImport(className, imports, group) {
        return this.moduleGenerationService.appendToGroup("import", className, imports, group);
    }

    buildExport(className, exports) {
        return this.moduleGenerationService.appendToGroup("export", className, exports);
    }

    findImport(index) {
        return this.moduleGenerationService.findLastOfGroup("import", index);
    }

    findExport(index) {
        return this.moduleGenerationService.findLastOfGroup("export", index);
    }
}