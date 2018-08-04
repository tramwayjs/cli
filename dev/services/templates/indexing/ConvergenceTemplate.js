import DirectoryTemplate from "./DirectoryTemplate";

export default class ConvergenceTemplate extends DirectoryTemplate {
    buildImport(module, imports) {
        let newImport = this.moduleGenerationService.addImportLine(module);
        return `${imports}\n${newImport}`;
    }

    buildExport(module, exports) {
        return this.moduleGenerationService.appendToGroup("export", `...${module}`, exports).replace('export {', 'export default {');
    }

    findImport(index) {
        return this.moduleGenerationService.findLines("import", index);
    }

    findExport(index) {
        return this.moduleGenerationService.findLastOfGroup("export", index);
    }
}