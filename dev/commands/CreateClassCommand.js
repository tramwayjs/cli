import {Command} from 'tramway-command';
import { DirectoryResolver } from '../services';

export default class CreateClassCommand extends Command {
    constructor(dependencyResolver, defaults = {}) {
        super();
        this.directoryResolver = dependencyResolver;
        this.defaults = defaults;
    }
}