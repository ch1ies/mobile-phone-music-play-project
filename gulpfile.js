const {
    series,
    src,
    dest,
    watch
} = require('gulp')

const htmlclean = require("gulp-htmlclean") // 压缩html文件
const less = require("gulp-less") // less转换为css
const cleancss = require("gulp-clean-css") // 压缩css文件

const stripDebug = require("gulp-strip-debug") // 清除不需要的debug和console
const ugify = require("gulp-uglify"); // 压缩js
const imageMin = require("gulp-imagemin") // 压缩图片

const connect = require("gulp-connect") //开启服务器

const folder = {
    src: "src/",
    dist: "dist/"
}

function html() {

    return src(folder.src + "html/*")
        .pipe(htmlclean())
        .pipe(dest(folder.dist + "html/"))
        .pipe(connect.reload())
}

function css() {
    return src(folder.src + "css/*")
        .pipe(less())
        .pipe(cleancss())
        .pipe(dest(folder.dist + "css/"))
        .pipe(connect.reload())
       
}

function js() {
    return src(folder.src + "js/*")
        // .pipe(stripDebug())
        // .pipe(ugify())
        .pipe(dest(folder.dist + "js/"))
        .pipe(connect.reload())
}

function image() {
    return src(folder.src + "images/*")
        .pipe(imageMin())
        .pipe(dest(folder.dist + "images/"))
}


function server(cb) {
    connect.server({
        port: "1573",
        livereload: true, // 开启热更新
    })
    cb()
}

watch(folder.src + "html/*", function (cb) {
    html()
    cb()
})

watch(folder.src + "css/*", function (cb) {
    css()
    cb()
})

watch(folder.src + "js/*", function (cb) {
    js()
    cb()
})

exports.default = series(html, css, js, image, server)