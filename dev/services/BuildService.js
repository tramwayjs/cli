import gulp from 'gulp';
import babel from 'gulp-babel';

export default class BuildService {
    constructor(gulpProvider) {
        this.gulpProvider = gulpProvider;
    }

    generateWildcard(dir, ext = 'js') {
        return `${dir}/**/*.${ext}`;
    }

    /**
     * 
     * @param {string} inDir 
     * @param {string} outDir 
     * @param {Object} options 
     */
    build(inDir, outDir, options = {}) {
        const {watch = false, hooks = [], onTaskStartHooks = [], onTaskFinishHooks = []} = options;

        let task = watch ? 'watch' : 'build';
        this.initializeTasks(inDir, outDir, {onTaskStartHooks, onTaskFinishHooks});

        return this.gulpProvider.start(task, ...hooks);
    }

    initializeTasks(inDir, outDir, options = {}) {
        const {onTaskStartHooks = [], onTaskFinishHooks = []} = options;

        const inDirJs = this.generateWildcard(inDir, 'js');
        const inDirTxt = this.generateWildcard(inDir, 'txt');

        this.gulpProvider.task('build', 
            () => {
                return gulp
                    .src(inDirJs)
                    .pipe(babel())
                    .pipe(gulp.dest(outDir));
            },
            {
                preOps: ['move-txt'],
                onStartHooks: onTaskStartHooks,
                onFinishHooks: onTaskFinishHooks,
            }
        )

        this.gulpProvider.task('move-txt', 
            () => {
                return gulp
                    .src(inDirTxt)
                    .pipe(gulp.dest(outDir));
            },
            {
                onStartHooks: onTaskStartHooks,
                onFinishHooks: onTaskFinishHooks,
            }
        )

        this.gulpProvider.task('watch', 
            () => gulp.watch(inDirJs, ['build']),
            {
                preOps: [],
                onStartHooks: onTaskStartHooks,
                onFinishHooks: onTaskFinishHooks,
            }
        )
    }
}