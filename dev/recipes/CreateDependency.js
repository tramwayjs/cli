import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
import { INDENTATION } from "../config/format";
const {indexing, dependencies} = templates;
const {ConvergenceTemplate} = indexing;
const {DependencyTemplate} = dependencies;

export default class CreateDependency extends Recipe {
    constructor(dir, filename) {
        super();

        this.dir = dir;
        this.filename = filename;

        this.fileProvider = new FileProvider();
        this.moduleGenerationService = new ModuleGenerationService();
        this.indexTemplate = new ConvergenceTemplate(this.moduleGenerationService);
        this.dependencyTemplate = new DependencyTemplate();
    }

    execute(data, ...next) {
        const {className, key, functions = [], args, classDirectory} = data;
        let fileContents = this.checkFileExistance(this.dir, this.filename);
        const fileExists = !!fileContents;

        if (!fileExists) {
            fileContents = this.dependencyTemplate.create();
            this.createIndex(this.dir, this.filename);
        }

        let imports = this.moduleGenerationService.findLastOfGroup('import', fileContents);
        let importsUpdate = this.moduleGenerationService.appendToGroup('import', className, imports, classDirectory);

        if (imports) {
            fileContents = fileContents.replace(imports, importsUpdate);
        }

        let dependency = this.createDependency(key, className, args, functions).replace(/^/gm, INDENTATION);

        if (fileExists) {
            fileContents = fileContents.replace('},\n}', `},\n${dependency}\n}`);
            fileContents = fileContents.replace(imports, importsUpdate);
        } else {
            fileContents = fileContents.replace('{}', `{\n${dependency}\n}`);
            fileContents = `${importsUpdate}\n\n${fileContents}`;
        }
    
        this.fileProvider.write(this.dir, this.filename, fileContents);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    checkFileExistance(dir, filename) {
        try {
            return this.fileProvider.read(`${dir}/${filename}.js`);
        } catch (e) {
            return false;
        }
    }

    createDependency(key, className, args, functions = []) {
        let contents = this.dependencyTemplate.format(className, key);

        contents = this.prepareConstructor(contents, args);
        contents = this.prepareFunctions(contents, functions);

        return contents;
    }

    createIndex(dir, filename) {
        let contents;
        let imports = '';
        let exports = '';

        try {
            contents = this.fileProvider.read(`${dir}/index.js`);
            imports = this.indexTemplate.findImport(contents);
            exports = this.indexTemplate.findExport(contents);
        } catch (e) {
        }

        contents = this.indexTemplate.format(filename, imports, exports);

        this.fileProvider.write(dir, "index", contents);
    }

    prepareConstructor(contents, args = []) {
        if (!args || !args.length) {
            return contents;
        }

        args = args.map(arg => `${arg}`).join(',\n').replace(/^/gm, `${INDENTATION}${INDENTATION}`);
        return contents.replace('"constructor": [],', `"constructor": [\n${args}\n${INDENTATION}],`);
    }

    prepareFunctions(contents, functions = []) {
        if (!functions || !functions.length) {
            return contents;
        }

        functions = functions.map(({name, args}) => {
            let func = this.dependencyTemplate.formatFunction(name);

            if (args) {
                args = args.join(',\n').replace(/^/gm, `${INDENTATION}${INDENTATION}`);
                func = func.replace('"args": []', `"args": [\n${args}\n${INDENTATION}]`);
            }

            return func;
        });

        functions = functions.join(',\n').replace(/^/gm, `${INDENTATION}${INDENTATION}`);
        return contents.replace('"functions": []', `"functions": [\n${functions}\n${INDENTATION}]`);
    }
}