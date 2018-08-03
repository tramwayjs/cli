import gulp from 'gulp';
import babel from 'gulp-babel';

export default class GulpProvider {
    task(name, method, options = {}) {
        const {preOps = [], onStartHooks = [], onFinishHooks = []} = options;

        gulp.task(
            name, 
            preOps, 
            () => {
                onStartHooks.forEach(hook => hook && hook.call && hook.apply && hook(name));
                method();
                onFinishHooks.forEach(hook => hook && hook.call && hook.apply && hook(name));
            },
        );
    }

    start(task, ...hooks) {
        gulp.start(task, () => {
            hooks.forEach(hook => hook && hook.call && hook.apply && hook(task));
        });
    }
}