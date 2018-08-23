import {
    IndexedItemRecipe,
    BasicItemRecipe,
    BatchItemRecipe,
    FixedItemRecipe,
    ContainerizedItemRecipe,
    IncludesDependencyRecipe,
} from '../../recipes';

export default {
    "recipe.restfulcontroller.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.class:restfulcontroller"},
        ]
    },
    "recipe.restfulcontroller": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.restfulcontroller.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.restfulcontroller.di": {
        "class": ContainerizedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.restfulcontroller.standalone"},
            {"type": "service", "key": "factory.dependency"},
        ]
    },
    "recipe.controller.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.class:controller"},
            {"type": "service", "key": "injector.controller_actions"},
        ]
    },
    "recipe.controller.indexed": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.controller.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.controller": {
        "class": ContainerizedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.controller.indexed"},
            {"type": "service", "key": "factory.dependency"},
        ]
    },
    "recipe.entity.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.class:entity"},
            {"type": "service", "key": "injector.class_properties"},
        ]
    },
    "recipe.entity.indexed": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.entity.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.entity": {
        "class": IncludesDependencyRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.entity.indexed"},
            {"type": "service", "key": "service.install:npm"},
            {"type": "parameter", "key": "recipe_dependency_entity_parameters"},
        ]
    },
    "recipe.provider.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.class:provider"},
        ]
    },
    "recipe.provider.indexed": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.provider.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.provider": {
        "class": IncludesDependencyRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.provider.indexed"},
            {"type": "service", "key": "service.install:npm"},
            {"type": "parameter", "key": "recipe_dependency_provider_parameters"},
        ]
    },
    "recipe.service.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.class:service"},
            {"type": "service", "key": "injector.constructor_dependencies"},
        ]
    },
    "recipe.service": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.service.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.repository.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.class:repository"},
        ]
    },
    "recipe.repository.indexed": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.repository.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.repository": {
        "class": IncludesDependencyRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.repository.indexed"},
            {"type": "service", "key": "service.install:npm"},
            {"type": "parameter", "key": "recipe_dependency_repository_parameters"},
        ]
    },
    "recipe.server": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.server"},
        ]
    },
    "recipe.app.single.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.config"},
        ]
    },
    "recipe.app.single.indexed": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.app.single.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.app": {
        "class": BatchItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.app.single.indexed"},
        ]
    },
    "recipe.babelrc.basic": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.dotfile"},
        ]
    },
    "recipe.babelrc": {
        "class": FixedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.babelrc.basic"},
            {"type": "parameter", "key": "recipe_babelrc_parameters"},
        ],
    },
    "recipe.gitignore.basic": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.dotfile"},
        ]
    },
    "recipe.gitignore": {
        "class": FixedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.gitignore.basic"},
            {"type": "parameter", "key": "recipe_gitignore_parameters"},
        ],
    },
    "recipe.dependency": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.dependency"},
        ]
    },
    "recipe.parameters": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.index:unification"},
        ]
    },
    "recipe.route.standalone": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.route"},
        ]
    },
    "recipe.route": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.route.standalone"},
            {"type": "service", "key": "factory.index:multiclass"},
        ]
    },
    "recipe.router.basic": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.config"},
        ]
    },
    "recipe.router": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.router.basic"},
            {"type": "service", "key": "factory.index:convergence"},
        ]
    },
    "recipe.logger.basic": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.config"},
        ]
    },
    "recipe.logger": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.logger.basic"},
            {"type": "service", "key": "factory.index:convergence"},
        ]
    },
    "recipe.winston.basic": {
        "class": BasicItemRecipe,
        "constructor": [
            {"type": "service", "key": "factory.config"},
        ]
    },
    "recipe.winston": {
        "class": IndexedItemRecipe,
        "constructor": [
            {"type": "service", "key": "recipe.winston.basic"},
            {"type": "service", "key": "factory.index:convergence"},
        ]
    },
}