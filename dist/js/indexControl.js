// 4   用面向对象的方法 ，添加一个索引切歌功能
(function (root) {
    function Index(len) {
        this.index = 0; //当前的索引值，默认为0
        this.len = len; // 数据的长度，用于做判断
    }
    Index.prototype = {
        prev: function () {
            return this.get(-1)
        },
        next: function () {
            return this.get(1)
        },
        // 用来获取索引值，参数为+1 表示下一曲，参数为-1 表示上一曲
        get: function (val) {
            this.index = (this.index + val + this.len) % this.len; // 控制边界，循环播放
            return this.index
        }
    }
    root.controlIndex = Index; // 把构造函数暴露出去,因为实例对象需要在外部传参
})(window.player || (window.player = {}))