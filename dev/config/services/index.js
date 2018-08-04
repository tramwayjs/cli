import core from './core';
import commands from './commands';
import services from './services';
import providers from './providers';

export default {
    ...core,
    ...commands,
    ...services,
    ...providers,
};