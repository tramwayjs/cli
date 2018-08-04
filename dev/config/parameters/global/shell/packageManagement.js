import {terminal} from 'tramway-command';
const {
    TimestampWarning, 
} = terminal;

export default {
    onCloseHook: (code, data) => {
        if (data) {
            new TimestampWarning(data);
        }
    },
}