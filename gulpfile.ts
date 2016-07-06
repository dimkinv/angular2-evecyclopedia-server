import * as gulp from 'gulp'
import * as ts from 'gulp-typescript'
import * as nodemon from 'gulp-nodemon'

gulp.task('ts', ()=>{
    return gulp.src(['**/*.ts', '!node_modules/**'])
    .pipe(ts())
    .pipe(gulp.dest('./'));
});

gulp.task('nodemon', ()=>{
    nodemon({
        script: './bin/www',
        ext: 'js json',
        ignore: [
            'node_modules'
        ]
    });
})

gulp.task('watch', ()=>{
    gulp.watch(['**/*.ts', '!node_modules/**'], ['ts']);
})

gulp.task('default', ['ts', 'nodemon', 'watch']);