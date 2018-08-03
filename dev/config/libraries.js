const cors = {library: 'cors', dependencies: []};
const bodyParser = {library: 'body-parser', dependencies: []};
const cookieParser = {library: 'cookie-parser', dependencies: []};
const methodOverride = {library: 'method-override', dependencies: []};
const express = {library: 'express', dependencies: [cors, bodyParser, cookieParser, methodOverride]};

const core = {library: 'tramway-core', dependencies: [express]};
const dependencyInjection = {library: 'tramway-core-dependency-injector', dependencies: []};
const router = {library: 'tramway-core-router', dependencies: []};
const connection = {library: 'tramway-core-connection', dependencies: []};
const mysql = {library: 'tramway-connection-mysql', dependencies: [connection]};
const arangodb = {library: 'tramway-connection-arangodb', dependencies: [connection]};
const mongodb = {library: 'tramway-connection-mongodb', dependencies: [connection]};
const api = {library: 'tramway-connection-rest-api', dependencies: [connection]};
const command = {library: 'tramway-command', dependencies: []};
const auth0 = {library: 'tramway-authentication-auth0-api', dependencies: []};

export const libraries = {
    mysql,
    arango: arangodb,
    arangodb,
    mongo: mongodb,
    mongodb,
    api: api,
    ajax: api,
    command,
    cron: command,
    auth0,
    connection,
    core,
    dependencyInjection,
    DI: dependencyInjection,
    'depenency-injection': dependencyInjection,
    router,
}

export const defaultLibraries = [
    'core',
    'router',
    'dependencyInjection',
];

export const keys = [
    'mysql',
    'arangodb',
    'mongodb',
    'command',
    'auth0',
    'connection',
    'core',
    'dependencyInjection',
    'router',
];

export const babelLibraries = [
    "babel-plugin-transform-flow-strip-types@^6.22.0",
    "babel-plugin-transform-object-rest-spread@^6.26.0",
    "babel-preset-es2015-node6@^0.4.0",
];