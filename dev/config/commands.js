import { 
    CreateControllerCommand,
    CreateRouteCommand,
    CreateServiceCommand,
    CreateDependencyCommand,
    CreateEntityCommand,
    CreateConnectionCommand,
    CreateRepositoryCommand,
} from "../commands";

export default {
    "create:controller": CreateControllerCommand,
    "create:route": CreateRouteCommand,
    "create:service": CreateServiceCommand,
    "create:dependency": CreateDependencyCommand,
    "create:entity": CreateEntityCommand,
    "create:connection": CreateConnectionCommand,
    "create:repository": CreateRepositoryCommand,
};