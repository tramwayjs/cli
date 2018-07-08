import {Command} from 'tramway-command';
import { DirectoryResolver } from '../services';

export default class CreateClassCommand extends Command {
    constructor() {
        super();
        this.directoryResolver = new DirectoryResolver();
    }
}