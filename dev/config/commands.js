import { 
    CreateControllerCommand,
    CreateRouteCommand,
    CreateServiceCommand,
    CreateDependencyCommand,
    CreateEntityCommand,
    CreateConnectionCommand,
    CreateRepositoryCommand,
    CreateProviderCommand,
    CreateApiCommand,
    InstallCommand,
    BuildCommand,
    StartCommand,
} from "../commands";

export default {
    "create:controller": CreateControllerCommand,
    "create:route": CreateRouteCommand,
    "create:service": CreateServiceCommand,
    "create:dependency": CreateDependencyCommand,
    "create:entity": CreateEntityCommand,
    "create:connection": CreateConnectionCommand,
    "create:provider": CreateProviderCommand,
    "create:repository": CreateRepositoryCommand,
    "create:api": CreateApiCommand,
    "install": InstallCommand,
    "build": BuildCommand,
    "start": StartCommand,
};