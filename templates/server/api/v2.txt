import {DependencyResolver} from 'tramway-core-dependency-injector';
import * as parameters from './config/parameters';
import services from './config/services';

DependencyResolver.initialize(services, parameters);

let app = DependencyResolver.getService('app');
app.initialize().start();