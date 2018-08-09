import {
    V1Builder,
    V3Builder,
} from "./versions";

export default class RouteBuilder {
    constructor(builder) {
        this.builder = builder;
    }

    create(params) {
        return this.builder.create(params);
    }
}