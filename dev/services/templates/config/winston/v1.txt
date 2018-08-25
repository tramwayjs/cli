export default {
    "winston": {},
    "file_error": {
        filename: './logs/error.log', 
        level: 'error',
        json: true,
        colorize: false,
    },
    "file_all": {
        filename: './logs/all.log', 
        json: true,
        handleExceptions: true,
        colorize: false,
    },
    "console_all": {
        handleExceptions: true,
        json: false,
        colorize: true,
    },
}