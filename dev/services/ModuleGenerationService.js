export default class ModuleGenerationService {
    constructor(format = {}) {
        this.format = format;
    }

    findLines(type, indexContents) {
        const start = indexContents.indexOf(type);
        const lastStart = indexContents.lastIndexOf(type);
        const finish = 1 + indexContents.indexOf(";", lastStart);
        return indexContents.substring(start, finish);
    }

    findLastOfGroup(type, indexContents) {
        const start = indexContents.lastIndexOf(type);
        
        if (0 > start) {
            return null;
        }

        let finish = 1;
        let symbol = "import" === type ? ";" : "}";

        finish += indexContents.indexOf(symbol, start);
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
        return `import * as ${group} from './${group}';`;
    }

    addExportLine(className, isDefault = true) {
        return `export ${isDefault ? 'default ': ''}${className};`;
    }

    addToGroup(type, className, group) {
        const {INDENTATION} = this.format;
        
        let result = `${type} {\n${INDENTATION}${className},\n}`;

        if ("import" === type) {
            result = `${result} from '${group}'`;
        }

        return `${result};`;
    }

    appendToGroup(type, className, block, group) {
        const {INDENTATION} = this.format;

        if (!block) {
            return this.addToGroup(type, className, group);
        }

        if (new RegExp(`${className},`).test(block)) {
            throw new Error(`${className} already exists in ${type}s`);
        }

        return block.replace('}', `${INDENTATION}${className},\n}`);
    }
}