import Logger, {middleware} from 'tramway-core-logger';

import {
    providers,
    transports,
} from 'tramway-logger-winston';

const {
    LoggerMiddlewareBuilder, 
    ErrorResponseMiddlewareBuilder,
    ErrorLoggerMiddlewareBuilder,
    NotFoundMiddlewareBuilder,
} = middleware;

const {WinstonProvider} = providers;
const {File, Console} = transports;

export default {
    "logger": {
        "class": Logger,
        "constructor": [
            {"type": "service", "key": "logger.provider.winston"},
        ],
    },
    "logger.provider.winston": {
        "class": WinstonProvider,
        "constructor": [
            {"type": "parameter", "key": "winston"},
        ], 
        "functions": [
            {
                "function": "addTransport", 
                "args": [
                    {"type": "service", "key": "transport.file:error"}
                ]
            },
            {
                "function": "addTransport", 
                "args": [
                    {"type": "service", "key": "transport.file:all"}
                ]
            },
            {
                "function": "addTransport", 
                "args": [
                    {"type": "service", "key": "transport.console"}
                ]
            },
        ]
    },
    "logger.middleware": {
        "class": LoggerMiddlewareBuilder,
        "constructor": [
            {"type": "service", "key": "logger.middleware.not.found"},
            {"type": "service", "key": "logger.middleware.error.logger"},
            {"type": "service", "key": "logger.middleware.error.response"},
        ],
    },
    "logger.middleware.error.response": {
        "class": ErrorResponseMiddlewareBuilder,
        "constructor": [
            {"type": "service", "key": "logger"}
        ],
    },
    "logger.middleware.error.logger": {
        "class": ErrorLoggerMiddlewareBuilder,
        "constructor": [
            {"type": "service", "key": "logger"}
        ],
    },
    "logger.middleware.not.found": {
        "class": NotFoundMiddlewareBuilder,
        "constructor": [
            {"type": "service", "key": "logger"}
        ],
    },
    "transport.file:error": {
        "class": File,
        "constructor": [
            {"type": "parameter", "key": "file_error"}
        ],
    },
    "transport.file:all": {
        "class": File,
        "constructor": [
            {"type": "parameter", "key": "file_all"}
        ],
    },
    "transport.console": {
        "class": Console,
        "constructor": [
            {"type": "parameter", "key": "console_all"}
        ]
    },
};