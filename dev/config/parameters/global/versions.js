export const class_type_connection = "connection";
export const class_type_controller = "controller";
export const class_type_restfulcontroller = "restfulcontroller";
export const class_type_entity = "entity";
export const class_type_provider = "provider";
export const class_type_repository = "repository";
export const class_type_service = "service";
export const class_type_factory = "factory";
export const class_type_service_rest = "restservice";

export const classes = {
    connection: 1,
    controller: 3,
    restfulcontroller: 3,
    entity: 1,
    provider: 1,
    repository: 2,
    service: 1, 
    factory: 1,
    restservice: 1,
};

export const methods = {
    constructor: 1,
    controllerAction: 3,
    getter: 1,
    setter: 1,
};

export const config = {
    babelrc: 1,
    router: 1,
    app: 1,
    cors: 1,
    port: 1,
    gitignore: 1,
    logger: 1,
    winston: 1,
    cookieParser: 1,
    bodyParser: 1,
    methodOverrides: 1,
}

export const server = {
    api: 2,
}