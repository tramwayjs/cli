import { 
    CreateControllerCommand,
    CreateRouteCommand,
    CreateServiceCommand,
    CreateFactoryCommand,
    CreateEntityCommand,
    CreateRepositoryCommand,
    CreateProviderCommand,
    CreateApiCommand,
    InstallCommand,
    BuildCommand,
    StartCommand,
} from "../../commands";

export default {
    "command.create.controller": {
        "class": CreateControllerCommand,
        "constructor": [
            {"type": "service", "key": "recipe.controller"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
            {"type": "service", "key": "recipe.route"},
        ]
    },
    "command.create.route": {
        "class": CreateRouteCommand,
        "constructor": [
            {"type": "service", "key": "recipe.route"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
            {"type": "service", "key": "recipe.controller"},
        ]
    },
    "command.create.service": {
        "class": CreateServiceCommand,
        "constructor": [
            {"type": "service", "key": "recipe.service"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
            {"type": "service", "key": "recipe.dependency"},
        ]
    },
    "command.create.entity": {
        "class": CreateEntityCommand,
        "constructor": [
            {"type": "service", "key": "recipe.entity"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.repository": {
        "class": CreateRepositoryCommand,
        "constructor": [
            {"type": "service", "key": "recipe.repository"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
            {"type": "service", "key": "recipe.dependency"},
        ]
    },
    "command.create.provider": {
        "class": CreateProviderCommand,
        "constructor": [
            {"type": "service", "key": "recipe.provider"},
            {"type": "service", "key": "recipe.dependency"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.factory": {
        "class": CreateFactoryCommand,
        "constructor": [
            {"type": "service", "key": "recipe.factory"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.api": {
        "class": CreateApiCommand,
        "constructor": [
            {"type": "service", "key": "recipe.route"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "defaults"},
            {"type": "service", "key": "recipe.route"},
            {"type": "service", "key": "recipe.entity"},
            {"type": "service", "key": "recipe.repository"},
            {"type": "service", "key": "recipe.service:rest"},
            {"type": "service", "key": "recipe.dependency"},
            {"type": "service", "key": "recipe.restfulcontroller"},
            {"type": "service", "key": "recipe.factory"},
        ]
    },
    "command.install": {
        "class": InstallCommand,
        "constructor": [
            {"type": "service", "key": "service.install:npm"},
            {"type": "service", "key": "service.directory_resolver"},
            {"type": "parameter", "key": "default_libraries"},
            {"type": "parameter", "key": "babel_libraries"},
            {"type": "parameter", "key": "defaults"},
            {"type": "service", "key": "recipe.server"},
            {"type": "service", "key": "recipe.app"},
            {"type": "service", "key": "recipe.babelrc"},
            {"type": "service", "key": "recipe.dependency"},
            {"type": "service", "key": "recipe.router"},
            {"type": "service", "key": "recipe.parameters"},
            {"type": "service", "key": "recipe.controller"},
            {"type": "service", "key": "recipe.route"},
            {"type": "service", "key": "recipe.gitignore"},
            {"type": "service", "key": "recipe.logger"},
            {"type": "service", "key": "recipe.winston"},
        ]
    },
    "command.build": {
        "class": BuildCommand,
        "constructor": [
            {"type": "service", "key": "service.build"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.start": {
        "class": StartCommand,
        "constructor": [
            {"type": "service", "key": "service.server"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
}