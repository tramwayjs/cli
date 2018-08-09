export default class RouteFactory {
    constructor(indexTemplate, fileProvider, builder, format = {}) {
        this.indexTemplate = indexTemplate;
        this.fileProvider = fileProvider;
        this.builder = builder;
        this.format = format;
    }

    create(filename, dir, options = {}) {
        const {
            className,
            routeArgs,
            action,
            path,
            methods,
            service,
        } = options;

        let contents;
        let importStatement;
        let routes;

        try {
            contents = this.fileProvider.read(`${dir}/${filename}.js`);
            importStatement = this.indexTemplate.findImport(contents);
            routes = this.findRoutes(contents);
        } catch (e) {

        }
        
        let routeEntry = this.createRouteEntry({className, action, path, methods, args: routeArgs, service});
        routes = this.addRouteEntry(routeEntry, routes);
        let content = routes;

        if (className && !service) {
            let imports;
    
            try {
                imports = this.indexTemplate.buildImport(className, importStatement, "../controllers");
            } catch (e) {
                imports = importStatement;
            }

            content = `${imports}\n\n${routes}`;
        }

        this.fileProvider.write(dir, filename, content);
    }

    createRouteEntry(params) {
        return this.builder.create(params);
    }

    addRouteEntry(routeEntry, routes) {
        const {INDENTATION} = this.format;

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