import Recipe from "./Recipe";
import { FileProvider } from "../providers";
import { ModuleGenerationService, templates } from '../services';
import { INDENTATION } from "../config/format";
const {indexing, routes} = templates;
const {DependencyExposure} = indexing;
const {RouteBuilder} = routes;

export default class CreateRoute extends Recipe {
    constructor(dir, filename, version) {
        super();
        this.dir = dir;
        this.filename = filename;
        this.version = version;
        this.indexTemplate = new DependencyExposure(new ModuleGenerationService());
        this.fileProvider = new FileProvider();
        this.builder = new RouteBuilder(version);
    }

    execute(data, ...next) {
        let contents;
        let importStatement;
        let routes;

        const {
            className, 
            action,
            path,
            methods,
            args,
            service,
        } = data;

        try {
            contents = this.fileProvider.read(`${this.dir}/${this.filename}.js`);
            importStatement = this.indexTemplate.findImport(contents);
            routes = this.findRoutes(contents);
        } catch (e) {

        }

        let imports;

        try {
            imports = this.indexTemplate.buildImport(className, importStatement, "../controllers");
        } catch (e) {
            imports = importStatement;
        }

        let routeEntry = this.createRouteEntry({className, action, path, methods, args, service});

        routes = this.addRouteEntry(routeEntry, routes);

        let content = `${imports}\n\n${routes}`;
        this.fileProvider.write(this.dir, this.filename, content);

        let [first, ...rest] = next;
        return first && first.execute(data, ...rest);
    }

    createRouteEntry(params) {
        return this.builder.create(params);
    }

    addRouteEntry(routeEntry, routes) {
        if (!routes) {
            return `const routeValues = [\n${INDENTATION}${routeEntry},\n];\n\nexport default routeValues;`;
        }

        return routes.replace(',\n];', `,\n${INDENTATION}${routeEntry},\n];`);
    }

    findRoutes(content) {
        const start = content.indexOf('const routeValues');
        const finish = 1 + content.lastIndexOf(';');
        return content.substring(start, finish);
    }
}