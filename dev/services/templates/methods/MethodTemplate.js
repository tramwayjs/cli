import AbstractTemplate from '../../AbstractTemplate';
import { methods } from '../../../config/versions';

export default class MethodTemplate extends AbstractTemplate {
    constructor() {
        super(/METHOD_NAME/g, __dirname, methods);
    }
}