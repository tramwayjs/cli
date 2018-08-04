import CommandResolver from 'tramway-command';
import DICommandFactory from 'tramway-command-di-factory';

export default {
    "app": {
        "class": CommandResolver,
        "constructor": [
            {"type": "parameter", "key": "commands"},
            {"type": "service", "key": "factory.command"},
        ],
    },
    "factory.command": {
        "class": DICommandFactory,
        "constructor": [
            {"type": "parameter", "key": "commands"},
        ],
    }
}