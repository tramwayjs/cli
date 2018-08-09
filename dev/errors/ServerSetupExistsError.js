export default class ServerSetupExistsError extends Error {
    constructor(dir) {
        super(`Server setup already exists in ${dir}`);
    }
}