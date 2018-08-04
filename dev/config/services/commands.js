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
} from "../../commands";

export default {
    "command.create.controller": {
        "class": CreateControllerCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.route": {
        "class": CreateRouteCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.service": {
        "class": CreateServiceCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.dependency": {
        "class": CreateDependencyCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.entity": {
        "class": CreateEntityCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.connection": {
        "class": CreateConnectionCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.repository": {
        "class": CreateRepositoryCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.provider": {
        "class": CreateProviderCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.create.api": {
        "class": CreateApiCommand,
        "constructor": [
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "defaults"},
        ]
    },
    "command.install": {
        "class": InstallCommand,
        "constructor": [
            {"type": "service", "key": "service.install:npm"},
            {"type": "service", "key": "service.dependency_resolver"},
            {"type": "parameter", "key": "default_libraries"},
            {"type": "parameter", "key": "babel_libraries"},
            {"type": "parameter", "key": "defaults"},
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