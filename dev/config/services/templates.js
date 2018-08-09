import { 
    indexing,
    dependencies,
    classes,
    config,
    methods,
    routes,
    server,
} from "../../services/templates";

const {
    ConvergenceTemplate,
    DependencyExposure,
    MultiClassDirectory,
    SingleClassDirectory,
    UnificationTemplate,
} = indexing;

const {
    DependencyTemplate,
} = dependencies;

const {
    ClassTemplate,
} = classes;

const {
    ConfigTemplate,
} = config;

const {
    MethodTemplate,
    GetterSetterTemplate,
} = methods;

const {
    RouteBuilder,
    versions,
} = routes;

const {
    V1Builder,
    V3Builder,
} = versions;

const {
    ServerTemplate,
} = server;

export default {
    "template.index:convergence": {
        "class": ConvergenceTemplate,
        "constructor": [
            {"type": "service", "key": "service.module_generation"},
        ]
    },
    "template.index:multiclass": {
        "class": MultiClassDirectory,
        "constructor": [
            {"type": "service", "key": "service.module_generation"},
        ]
    },
    "template.index:unification": {
        "class": UnificationTemplate,
        "constructor": [
            {"type": "service", "key": "service.module_generation"},
        ]
    },
    "template.index:dependency_exposure": {
        "class": DependencyExposure,
        "constructor": [
            {"type": "service", "key": "service.module_generation"},
        ]
    },
    "template.dependency": {
        "class": DependencyTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
        ]
    },
    "template.class": {
        "class": ClassTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_versions"},
        ]
    },
    "template.config": {
        "class": ConfigTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "config_versions"},
        ]
    },
    "template.method": {
        "class": MethodTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "method_versions"},
        ]
    },
    "template.method:getter_setter": {
        "class": GetterSetterTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "method_versions"},
        ]
    },
    "template.route:v1": {
        "class": RouteBuilder,
        "constructor": [
            {"type": "service", "key": "builder.route:v1"},
        ]
    },
    "template.route:v2": {
        "class": RouteBuilder,
        "constructor": [
            {"type": "service", "key": "builder.route:v1"},
        ]
    },
    "template.route:v3": {
        "class": RouteBuilder,
        "constructor": [
            {"type": "service", "key": "builder.route:v3"},
        ]
    },
    "builder.route:v1": {
        "class": V1Builder,
    },
    "builder.route:v3": {
        "class": V3Builder,
    },
    "template.server": {
        "class": ServerTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "server_versions"},
        ]
    },
}