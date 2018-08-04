import { INDENTATION } from "../../../../config/format";

export default class V1Builder {
    create({className, func, path, methods, args}) {
        let pieces = [];

        if (func) {
            pieces.push(`\"controller\": ${className}.${func}`);
        }

        if (className && !func) {
            pieces.push(`\"controllerClass\": ${className}`);
        }

        if (path) {
            pieces.push(`\"path\": \"${path}\"`);
        }

        if (methods) {
            pieces.push(`\"methods\": ${JSON.stringify(methods)}`);
        }

        if (args) {
            pieces.push(`\"arguments\": ${JSON.stringify(args)}`);
        }

        let parts = pieces.join(`,\n${INDENTATION}${INDENTATION}`);

        return `{\n${INDENTATION}${INDENTATION}${parts}\n${INDENTATION}}`;
    }
}