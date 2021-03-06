export default class V3Builder {
    constructor(format = {}) {
        this.format = format;
    }

    create({className, func, path, methods, args, service, action}) {
        const {INDENTATION} = this.format;

        let pieces = [];

        if (service) {
            pieces.push(`\"controller\": "${service}"`);
        } else if(className) {
            pieces.push(`\"controller\": new ${className}()`);
        }
        
        if (func || action) {
            pieces.push(`\"action\": "${func || action}"`);
        } else {
            pieces.push(`\"restful\": true`);
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