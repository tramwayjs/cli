import fs from 'fs';
import IndexGenerationService from './IndexGenerationService';

export default class ClassCreationService {
    constructor() {
        this.indexGenerationService = new IndexGenerationService();
        this.fileProvider
    }

    createClass(className, dir) {
        try {
            fs.writeFileSync(`${dir}/${className}.js`, `export default class Test {}`);
            this.indexGenerationService.addIndexForClass(className, dir);
        } catch (e) {
            console.log(e)
            fs.mkdirSync(dir);
            return this.createClass(className, dir);
        }
    }
}