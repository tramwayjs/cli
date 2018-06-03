export default class ModuleGenerationService {
    findLines(type, indexContents) {
        const start = indexContents.indexOf(type);
        const lastStart = indexContents.lastIndexOf(type);
        const finish = 1 + indexContents.indexOf(";", lastStart);
        return indexContents.substring(start, finish);
    }

    findLastOfGroup(type, indexContents) {
        const start = indexContents.lastIndexOf(type);
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