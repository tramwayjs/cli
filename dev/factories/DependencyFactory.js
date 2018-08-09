export default class DependencyFactory {
    constructor(dependencyTemplate, fileProvider, moduleGenerationService, indexFactory, format = {}) {
        this.dependencyTemplate = dependencyTemplate;
        this.fileProvider = fileProvider;
        this.moduleGenerationService = moduleGenerationService;
        this.indexFactory = indexFactory;
        this.format = format;
    }

    create(name, dir, options = {}) {
        const {
            key, 
            functions = [], 
            constructorArgs, 
            filename,
            parentDir, 
        } = options;

        const {INDENTATION} = this.format;

        let fileContents = this.checkExistance(dir, filename);
        const fileExists = !!fileContents;

        if (!fileExists) {
            fileContents = this.dependencyTemplate.create();
            this.indexFactory.create(filename, dir);
        }

        let imports = this.moduleGenerationService.findLastOfGroup('import', fileContents);
        let importsUpdate = this.moduleGenerationService.appendToGroup('import', name, imports, parentDir);

        if (imports) {
            fileContents = fileContents.replace(imports, importsUpdate);
        }

        let dependency = this.createDependency(key, name, constructorArgs, functions).replace(/^/gm, INDENTATION);

        if (fileExists) {
            fileContents = fileContents.replace('},\n}', `},\n${dependency}\n}`);
            fileContents = fileContents.replace(imports, importsUpdate);
        } else {
            fileContents = fileContents.replace('{}', `{\n${dependency}\n}`);
            fileContents = `${importsUpdate}\n\n${fileContents}`;
        }
    
        this.fileProvider.write(dir, filename, fileContents);
    }

    checkExistance(dir, filename) {
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

    prepareConstructor(contents, args = []) {
        if (!args || !args.length) {
            return contents;
        }

        const {INDENTATION} = this.format;

        args = args.map(arg => `${arg}`).join(',\n').replace(/^/gm, `${INDENTATION}${INDENTATION}`);
        return contents.replace('"constructor": [],', `"constructor": [\n${args}\n${INDENTATION}],`);
    }

    prepareFunctions(contents, functions = []) {
        if (!functions || !functions.length) {
            return contents;
        }

        const {INDENTATION} = this.format;

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