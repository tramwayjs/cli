import fs from 'fs';
import ModuleGenerationService from './ModuleGenerationService';
// import { templates } from '.';
import ClassTemplate from './templates/classes/ClassTemplate';
import {UnificationTemplate, MultiClassDirectory, SingleClassDirectory} from './templates/indexing';

// const {index} = templates;
// const {UnificationTemplate, MultiClassDirectory, SingleClassDirectory} = index;

export default class IndexGenerationService {
    constructor() {
        this.moduleGenerationService = new ModuleGenerationService();
    }

    addIndexForClass(className, dir) {
        let indexTemplate = new MultiClassDirectory(this.moduleGenerationService);
        let imports, exports;

        const indexDir = `${dir}/index.js`;

        try {
            let indexFile = this.read(indexDir);
            imports = this.moduleGenerationService.findImport(indexFile);
            exports = this.moduleGenerationService.findExport(indexFile);
        } catch (e) {
            console.log(e)
        }

        this.write(indexDir, indexTemplate.format(className, imports, exports));
    }

    read(dir) {
        const buffer = fs.readFileSync(dir);
        return buffer.toString();
    }

    write(dir, data) {
        fs.writeFileSync(dir, data);
    }

    addClassToGroup(className, dir) {
        let indexFileContents = this.read(`${dir}/index.js`);
        let importContents = this.moduleGenerationService.findImport(indexFileContents);
        importContents = this.moduleGenerationService.appendToGroup(className, importContents);

        let exportContents = this.moduleGenerationService.findExport(indexFileContents);
        exportContents = this.moduleGenerationService.appendToGroup(className, exportContents);

        return this.formatFile(importContents, exportContents);
    }

    formatFile(importContents, exportContents) {

        console.log('=============')
        let a = new SingleClassDirectory(this.moduleGenerationService);
        console.log(a.format("Test", importContents, exportContents));
        console.log('=============')

        console.log('=============')
        a = new MultiClassDirectory(this.moduleGenerationService);
        console.log(a.format("Test", importContents, exportContents));
        console.log('=============')

        console.log('=============')
        a = new UnificationTemplate(this.moduleGenerationService);
        console.log(a.format("Test", importContents, exportContents));
        console.log('=============')

        console.log('=============')
        a = new ClassTemplate();
        console.log(a.format("Test", "Controller"))
        console.log('=============')

        // console.log('-------------')
        // console.log(importContents)
        // console.log('-------------')
        // console.log(exportContents)
        // console.log('-------------')
        return `${importContents}\n${exportContents}`;
    }
}