import {commands} from 'tramway-command';
let {CommandResolver} = commands;
import {
    commands as commandsIndex, 
    location,
} from './config';

let config = commandsIndex;

if (commandsIndex.default) {
    config = commandsIndex.default;
}

export default (new CommandResolver(config)).run();