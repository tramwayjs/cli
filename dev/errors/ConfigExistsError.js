export default class ConfigExistsError extends Error {
    constructor(type, dir) {
        super(`${type} config already exists in ${dir}`);
    }
}