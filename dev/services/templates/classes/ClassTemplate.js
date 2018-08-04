import AbstractTemplate from '../../AbstractTemplate';
import {classes} from '../../../config/versions';

export default class ClassTemplate extends AbstractTemplate {
    constructor() {
        super(/CLASS_NAME/g, __dirname, classes);
    }
}