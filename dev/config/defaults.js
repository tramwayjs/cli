export const CONTROLLER_DIRECTORY = process.env.TRAMWAY_PROJECT_CONTROLLERS_PATH || "controllers";
export const SERVICE_DIRECTORY = process.env.TRAMWAY_PROJECT_SERVICES_PATH || "services";
export const ENTITY_DIRECTORY = process.env.TRAMWAY_PROJECT_ENTITIES_PATH || "entities";
export const CONNECTION_DIRECTORY = process.env.TRAMWAY_PROJECT_CONNECTIONS_PATH || "connections";
export const REPOSITORY_DIRECTORY = process.env.TRAMWAY_PROJECT_REPOSITORIES_PATH || "repositories";
export const PROVIDER_DIRECTORY = process.env.TRAMWAY_PROJECT_PROVIDERS_PATH || "providers";

export const CONFIG_DIRECTORY = process.env.TRAMWAY_PROJECT_CONFIG_PATH || 'config';
export const DEPENDENCY_INJECTION_SERVICES_DIRECTORY = `${CONFIG_DIRECTORY}/services`;
export const DEPENDENCY_INJECTION_PARAMETERS_DIRECTORY = `${CONFIG_DIRECTORY}/parameters`;

export const ROUTES_CONFIG_FILENAME = process.env.TRAMWAY_PROJECT_ROUTES_FILE || 'routes';
export const DEPENDENCY_INJECTION_SERVICES_FILENAME = process.env.TRAMWAY_PROJECT_SERVICES_FILE || 'services';
