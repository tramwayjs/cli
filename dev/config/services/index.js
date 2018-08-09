import core from './core';
import commands from './commands';
import services from './services';
import providers from './providers';
import factories from './factories';
import templates from './templates';
import recipes from './recipes';
import injectors from './injectors';

export default {
    ...core,
    ...commands,
    ...services,
    ...providers,
    ...factories,
    ...templates,
    ...recipes,
    ...injectors,
};