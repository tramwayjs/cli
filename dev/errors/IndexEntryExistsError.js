export default class IndexEntryExistsError extends Error {
    constructor() {
        super('Index configuration already declared');
    }
}