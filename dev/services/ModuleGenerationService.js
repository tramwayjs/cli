export default class ModuleGenerationService {
    findImport(indexContents) {
        const start = indexContents.lastIndexOf("import");
        const finish = 1 + indexContents.indexOf(";", start);
        return indexContents.substring(start, finish);
    }

    findExport(indexContents) {
        const start = indexContents.lastIndexOf("export");
        const finish = 1 + indexContents.indexOf("}", start);
        return indexContents.substring(start, finish);
    }

    isDefaultExport(exportContents) {
        return exportContents.includes("default");
    }

    addImportLine(className, isDefault = true) {
        if (!isDefault) {
            className = `{${className}}`;
        }

        return `import ${className} from './${className}';`;
    }

    addImportGroup(group) {
        return `import * as ${group} from './${group};`;
    }

    addExportLine(className, isDefault = true) {
        return `export ${isDefault ? 'default ': ''}${className};`;
    }

    addExportGroup(className) {
        return `export {\n    ${className},\n};`
    }

    appendToGroup(className, group) {
        if (!group) {
            return this.addExportGroup(className);
        }

        return group.replace('}', `    ${className},\n}`);
    }
}