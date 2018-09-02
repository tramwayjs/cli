import {
    ControllerActionsInjector,
    ClassPropertiesInjector,
    ConstructorDependenciesInjector,
    ReplacementInjector,
} from '../../injectors';

export default {
    "injector.controller_actions": {
        "class": ControllerActionsInjector,
        "constructor": [
            {"type": "service", "key": "template.method"},
            {"type": "parameter", "key": "format"},
        ]
    },
    "injector.class_properties": {
        "class": ClassPropertiesInjector,
        "constructor": [
            {"type": "service", "key": "template.method:getter_setter"},
            {"type": "parameter", "key": "format"},
        ]
    },
    "injector.constructor_dependencies": {
        "class": ConstructorDependenciesInjector,
        "constructor": [
            {"type": "service", "key": "template.method"},
            {"type": "parameter", "key": "format"},
        ]
    },
    "injector.replacement": {
        "class": ReplacementInjector,
    },
}