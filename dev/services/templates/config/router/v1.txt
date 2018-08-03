import {Router, strategies} from 'tramway-core-router';
import { DependencyResolver } from 'tramway-core-dependency-injector';

const {ExpressServerStrategy} = strategies;

export default {
    "router": {
        "class": Router,
        "constructor": [
            {"type": "parameter", "key": "routes"},
            {"type": "service", "key": "express-router-strategy"},
            DependencyResolver
        ],
    },
    "express-router-strategy": {
        "class": ExpressServerStrategy,
        "constructor": [
            {"type": "parameter", "key": "app"},
        ]
    }
}