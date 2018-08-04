import {location} from '../config';

export default class DirectoryResolver {
    resolve(path) {
        if (!path) {
            return location;
        }
        
        return `${location}/${path}`;
    }
}