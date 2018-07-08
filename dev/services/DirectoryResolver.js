import {location} from '../config';

export default class DirectoryResolver {
    resolve(path) {
        return `${location}/${path}`;
    }
}