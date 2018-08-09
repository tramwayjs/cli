import AbstractTemplate from '../../AbstractTemplate';

export default class ServerTemplate extends AbstractTemplate {
    constructor(fileProvider, server) {
        super(fileProvider, server, __dirname);
    }
}