// function defaultTask(cb) {
//     // place code for your default task here
//     console.log(0)
//     cb();
//   }

// const {
//     series,
//     parallel,
// } = require("gulp")


//   exports.default = defaultTask

//gulp函数中为 ：公开任务 ，私有任务
//公开任务 :导出的函数
// 私有任务：未导出的函数

// const {series,parallel} = require("gulp")
// // console.log(gulp)

// function Fn1(cb){
//     console.log("fn1被调用了")
//     cb(); // return
// }

// function fn2(cb){
//     console.log("fn2被调用了")
//     cb(); // return
// }

//  exports.build = Fn1;
//  exports.default = series(Fn1,fn2);  //依次执行组合任务


//任务
// function js(cb) {
//     console.log("js execued")
//     cb()
// }

// function css(cb) {
//     console.log("css execued")
//     cb()
// }

// function html(cb) {
//     console.log("html execued")
//     cb()
// }
//  exports.default = series(js, css)   // 依次执行函数  ,前面发生错误，任务就结束了
//  exports.default = parallel(js, css)  // 并行执行函数
//  exports.default = parallel(js, parallel(css,html))  // 并行执行函数


 //处理文件(流操作)   输入，输出   I O 只经过一次输出（最终文件）
//中间环节需 调用 pipe 处理


// const {src, dest} = require('gulp');
// const uglify = require("gulp-uglify")  // 压缩代码
// const rename = require("gulp-rename")  
//  exports.default = function(){
//      return src("src/js/*.js")   //* 所有后缀名为js
//         .pipe(uglify)
//         .pipe(rename({
//             extnaem : ".min.js"
//         }))
//         .pipe(dest("dist/js"))
//  }


//文件监控    自带热更新
const {watch} = require("gulp")
watch("src/css/*" ,{
    delay : 2000
},function(cb){
    console.log("文件被修改了")
    cb()
})