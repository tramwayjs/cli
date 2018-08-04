export default class DirectoryResolver {
    constructor(location) {
        this.location = location;
    }

    resolve(path) {
        if (!path) {
            return this.location;
        }
        
        return `${this.location}/${path}`;
    }
}