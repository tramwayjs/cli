export default class IndexFileExistsError extends Error {
    constructor(dir) {
        super(`Index config already exists in ${dir}`);
    }
}