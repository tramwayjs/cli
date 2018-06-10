import { 
    CreateControllerCommand,
    CreateRouteCommand,
    CreateServiceCommand,
    CreateDependencyCommand,
} from "../commands";

export default {
    "create:controller": CreateControllerCommand,
    "create:route": CreateRouteCommand,
    "create:service": CreateServiceCommand,
    "create:dependency": CreateDependencyCommand,
};