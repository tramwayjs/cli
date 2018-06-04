export default class ModuleGenerationService {
    findLines(type, indexContents) {
        const start = indexContents.indexOf(type);
        const lastStart = indexContents.lastIndexOf(type);
        const finish = 1 + indexContents.indexOf(";", lastStart);
        return indexContents.substring(start, finish);
    }

    findLastOfGroup(type, indexContents) {
        const start = indexContents.lastIndexOf(type);

        let finish = 1;

        if ("import" === type) {
            finish += indexContents.indexOf(";", start);
        } else {
            finish += indexContents.indexOf("}", start);
        }

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

    addToGroup(type, className, group) {
        let result = `${type} {\n    ${className},\n}`;

        if ("import" === type) {
            result = `${result} from '${group}'`;
        }

        return `${result};`;
    }

    appendToGroup(type, className, block, group) {
        if (!block) {
            return this.addToGroup(type, className, group);
        }

        return block.replace('}', `    ${className},\n}`);
    }
}