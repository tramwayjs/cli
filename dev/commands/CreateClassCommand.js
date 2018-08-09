import {Command} from 'tramway-command';
import { DirectoryResolver } from '../services';

export default class CreateClassCommand extends Command {
    /**
     * 
     * @param {DirectoryResolver} directoryResolver 
     * @param {*} defaults 
     */
    constructor(recipe, directoryResolver, defaults = {}) {
        super();
        this.recipe = recipe;
        this.directoryResolver = directoryResolver;
        this.defaults = defaults;
    }
}