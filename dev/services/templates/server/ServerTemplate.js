import AbstractTemplate from '../../AbstractTemplate';

export default class ServerTemplate extends AbstractTemplate {
    constructor(fileProvider, server, dirname) {
        super(fileProvider, server, dirname);
    }
}