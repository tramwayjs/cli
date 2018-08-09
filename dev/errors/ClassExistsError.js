export default class ClassExistsError extends Error {
    constructor(name, dir) {
        super(`${name} already exists in ${dir}`)
    }
}