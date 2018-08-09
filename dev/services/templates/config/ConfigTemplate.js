import AbstractTemplate from '../../AbstractTemplate';

export default class ConfigTemplate extends AbstractTemplate {
    constructor(fileProvider, config) {
        super(fileProvider, config, __dirname);
    }
}