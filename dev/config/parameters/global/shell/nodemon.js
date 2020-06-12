import path from 'path';
import {terminal} from 'tramway-command';
const {
    TimestampLog,
    TimestampError, 
} = terminal;

export default {
    command: path.resolve('./node_modules/.bin/nodemon'), 
    spawnOptions: {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: 'win32' === process.platform,
    },
    onMessageHook: message => {
        new TimestampLog(message);
    },
    onErrorMessageHook: message => {
        new TimestampError(message);
    }
}