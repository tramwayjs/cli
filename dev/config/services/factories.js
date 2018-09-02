import { 
    IndexFactory,
    ClassFactory,
    ServerFactory,
    ConfigFactory,
    DotFileFactory,
    DependencyFactory,
    RouteFactory,
} from "../../factories";

export default {
    "factory.index:multiclass": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "template.index:multiclass"},
            {"type": "service", "key": "provider.file"},
        ]
    },
    "factory.index:convergence": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "template.index:convergence"},
            {"type": "service", "key": "provider.file"},
        ]
    },
    "factory.index:unification": {
        "class": IndexFactory,
        "constructor": [
            {"type": "service", "key": "template.index:unification"},
            {"type": "service", "key": "provider.file"},
        ]
    },
    "factory.class:repository": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_repository"},
        ]
    },
    "factory.class:provider": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_provider"},
        ]
    },
    "factory.class:factory": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_factory"},
        ]
    },
    "factory.class:service": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_service"},
        ]
    },
    "factory.class:service:rest": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_service_rest"},
        ]
    },
    "factory.class:connection": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_connection"},
        ]
    },
    "factory.class:controller": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_controller"},
        ]
    },
    "factory.class:entity": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_entity"},
        ]
    },
    "factory.class:restfulcontroller": {
        "class": ClassFactory,
        "constructor": [
            {"type": "service", "key": "template.class"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_type_restfulcontroller"},
        ]
    },
    "factory.server": {
        "class": ServerFactory,
        "constructor": [
            {"type": "service", "key": "template.server"},
            {"type": "service", "key": "provider.file"},
        ]
    },
    "factory.config": {
        "class": ConfigFactory,
        "constructor": [
            {"type": "service", "key": "template.config"},
            {"type": "service", "key": "provider.file"},
        ]
    },
    "factory.dotfile": {
        "class": DotFileFactory,
        "constructor": [
            {"type": "service", "key": "template.config"},
            {"type": "service", "key": "provider.file"},
        ]
    },
    "factory.dependency": {
        "class": DependencyFactory,
        "constructor": [
            {"type": "service", "key": "template.dependency"},
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "service.module_generation"},
            {"type": "service", "key": "factory.index:convergence"},
            {"type": "parameter", "key": "format"},
        ]
    },
    "factory.route": {
        "class": RouteFactory,
        "constructor": [
            {"type": "service", "key": "template.index:dependency_exposure"},
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "template.route:v3"},
            {"type": "parameter", "key": "format"},
        ]
    },
}