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
            {"type": "parameter", "key": "dependency_dirname"},
        ]
    },
    "template.class": {
        "class": ClassTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "class_versions"},
            {"type": "parameter", "key": "class_dirname"},
        ]
    },
    "template.config": {
        "class": ConfigTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "config_versions"},
            {"type": "parameter", "key": "config_dirname"},
        ]
    },
    "template.method": {
        "class": MethodTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "method_versions"},
            {"type": "parameter", "key": "method_dirname"},
        ]
    },
    "template.method:getter_setter": {
        "class": GetterSetterTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "method_versions"},
            {"type": "parameter", "key": "method_dirname"},
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
        "constructor": [
            {"type": "parameter", "key": "format"},
        ]
    },
    "builder.route:v3": {
        "class": V3Builder,
        "constructor": [
            {"type": "parameter", "key": "format"},
        ]
    },
    "template.server": {
        "class": ServerTemplate,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "server_versions"},
            {"type": "parameter", "key": "server_dirname"},
        ]
    },
}