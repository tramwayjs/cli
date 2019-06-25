import commands from './commands';
import {
    packageManagement as shell_package_management,
    npm as shell_npm,
    nodemon as shell_nodemon,
} from './shell';
import {
    libraries,
    defaultLibraries as default_libraries, 
    keys as library_keys, 
    babelLibraries as babel_libraries,
    removedBabelLibraries as babel_uninstall_libraries,
} from './libraries';
import * as defaults from './defaults';
import * as format from './format';
import location from './location';
import {
    classes as class_versions, 
    methods as method_versions, 
    config as config_versions, 
    server as server_versions,
    class_type_connection,
    class_type_controller,
    class_type_restfulcontroller,
    class_type_entity,
    class_type_provider,
    class_type_repository,
    class_type_service,
    class_type_factory,
    class_type_service_rest,
} from './versions';
import {
    recipe_babelrc_parameters,
    recipe_gitignore_parameters,
    recipe_dependency_entity_parameters,
    recipe_dependency_provider_parameters,
    recipe_dependency_repository_parameters,
    recipe_dependency_factory_parameters,
} from './recipes';
import class_dirname from '../../../../templates/classes';
import config_dirname from '../../../../templates/config';
import dependency_dirname from '../../../../templates/dependencies';
import method_dirname from '../../../../templates/methods';
import server_dirname from '../../../../templates/server';

export {
    commands,
    shell_package_management,
    shell_npm,
    shell_nodemon,
    libraries,
    default_libraries,
    library_keys,
    babel_libraries,
    babel_uninstall_libraries,
    defaults,
    format,
    location,
    class_versions,
    class_dirname,
    method_versions,
    method_dirname,
    config_versions,
    config_dirname,
    server_versions,
    server_dirname,
    dependency_dirname,
    class_type_connection,
    class_type_controller,
    class_type_restfulcontroller,
    class_type_entity,
    class_type_provider,
    class_type_repository,
    class_type_service,
    class_type_factory,
    class_type_service_rest,
    recipe_babelrc_parameters,
    recipe_gitignore_parameters,
    recipe_dependency_entity_parameters,
    recipe_dependency_provider_parameters,
    recipe_dependency_repository_parameters,
    recipe_dependency_factory_parameters,
};