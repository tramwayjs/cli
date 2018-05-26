import fs from 'fs';

export default class IndexGenerationService {
    read(dir) {
        const buffer = fs.readFileSync(dir);
        return buffer.toString();
    }

    write() {

    }

    addClassToGroup(className, dir) {
        let indexFileContents = this.read(`${dir}/index.js`);
        let importContents = this.findImport(indexFileContents);
        importContents = this.appendToGroup(className, importContents);

        let exportContents = this.findExport(indexFileContents);
        exportContents = this.appendToGroup(className, exportContents);

        return this.formatFile(importContents, exportContents);
    }

    findImport(indexContents) {
        const start = indexContents.lastIndexOf("import");
        const finish = 1 + indexContents.indexOf("}", start);
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

    addExportLine(className, isDefault = true) {
        return `export ${isDefault ? 'default ': ''} ${className};`;
    }

    appendToGroup(className, group) {
        return group.replace('}', `    ${className},\n}`);
    }

    formatFile(importContents, exportContents) {
        console.log(importContents)
        console.log(exportContents)
        return `${importContents}\n${exportContents}`;
    }
}