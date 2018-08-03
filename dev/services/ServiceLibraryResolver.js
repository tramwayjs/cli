export default class ServiceLibraryResolver {
    constructor(mapping) {
        this.mapping = mapping;
    }

    getLibrary(service) {
        let library = this.mapping[service];

        if (!library) {
            throw new Error(`No library found for service: ${service}`);
        }

        return library;
    }
}