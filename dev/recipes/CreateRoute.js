import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
const {indexing} = templates;
const {DependencyExposure} = indexing;

export default class CreateRoute extends Recipe {
    constructor(dir, filename) {
        super();
        this.dir = dir;
        this.filename = filename;
        this.indexTemplate = new DependencyExposure(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
    }

    execute(data, ...next) {
        let contents;
        let importStatement;
        let routes;

        const {className} = data;

        try {
            contents = this.fileProvider.read(`${this.dir}/${this.filename}.js`);
            importStatement = this.indexTemplate.findImport(contents);
            routes = this.findRoutes(contents);
        } catch (e) {

        }

        let imports = this.indexTemplate.buildImport(className, importStatement, "../controllers");

        let routeEntry = this.createRouteEntry(className, 'index', '/stuff', ['get']);

        routes = this.addRouteEntry(routeEntry, routes);

        let content = `${imports}\n\n${routes}`;
        this.fileProvider.write(this.dir, this.filename, content);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    createRouteEntry(className, func, path, methods, args) {
        let pieces = [];

        if (func) {
            pieces.push(`\"controller\": ${className}.${func}`);
        }

        if (className && !func) {
            pieces.push(`\"controllerClass\": ${className}`);
        }

        if (path) {
            pieces.push(`\"path\": \"${path}\"`);
        }

        if (methods) {
            pieces.push(`\"methods\": ${JSON.stringify(methods)}`);
        }

        if (args) {
            pieces.push(`\"arguments\": ${JSON.stringify(args)}`);
        }

        let parts = pieces.join(`,\n        `);

        return `{\n        ${parts}\n    }`;
    }

    addRouteEntry(routeEntry, routes) {
        if (!routes) {
            return `const routeValues = [\n    ${routeEntry},\n];\n\nexport default routeValues;`;
        }

        return routes.replace(',\n];', `,\n    ${routeEntry},\n];`);
    }

    findRoutes(content) {
        const start = content.indexOf('const routeValues');
        const finish = 1 + content.lastIndexOf(';');
        return content.substring(start, finish);
    }
}