import {
    V1Builder,
    V3Builder,
} from "./versions";

export default class RouteBuilder {
    constructor(version) {
        this.builder = this.resolveBuilder(version);
    }

    create(params) {
        return this.builder.create(params);
    }

    resolveBuilder(version) {
        switch(version) {
            case 1: return new V1Builder();
            case 2: return new V1Builder();
            case 3: return new V3Builder();
            default: return new V3Builder();
        }
    }
}