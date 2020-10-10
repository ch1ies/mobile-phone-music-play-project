(function($,player){
    function MusicPlayer(dom){
        this.wrap = dom  //播放器的容器
        this.dataList = []  // 存放请求到的数据
        //this.index = 1; // 歌曲的索引

        this.indexObj = null; // 索引值对象(用于切歌)
        this.rotataTimer = null;  // 旋转唱片的定时器
        this.lilst = null;  //列表切歌对象（在listPLaay里赋值）
        
        this.curIndex = 0; //当前播放歌曲的索引值
    }
    MusicPlayer.prototype = {
        init:function(){ // 初始化
            this.getDom(); // 获取元素
            this.getData("../mock/data.json") // 请求数据

            
        },
        getDom:function(){ // 获取页面里的元素
            this.record = document.querySelector(".songImg img") //获取图片的信息，旋转图片
            // console.log(this.record)
            this.controlBtns = document.querySelectorAll('.control li')
        },
        getData:function(url){  //用来请求数据
            var This = this
            $.ajax({
                url:url,
                method:"get",
                success:function(data){
                    This.dataList = data;  // 存储请求过来的数据
                   
                    This.listPlay(); //列表切歌，它要放在loadMusix的前面，因为this.list要在loadMusic里调用

                    This.indexObj = new player.controlIndex(data.length)
                  
                    This.loadMusic(This.indexObj.index)   //加载音乐

                    This.musicControl(); // 添加音乐操作功能
                },
                error:function(){
                    console.log("数据请求失败")
                }
            })
        },

        loadMusic:function(index){  // 用来加载音乐
            player.render(this.dataList[index]); // 渲染图片，歌曲信息
            player.music.load(this.dataList[index].audioSrc);

            //播放音乐（只有音乐状态为play的时候才能播放）
            if(player.music.status == "play"){
                player.music.play();
                this.controlBtns[2].className = "playing" // 按钮的状态变成播放状态
                this.imgRotate(0); // 旋转图片
            }

            //改变列表里歌曲的选中状态
            this.list.changeSelect(index)
            this.curIndex = index;
        },

        /* 3.添加按钮控制的事件 */
        musicControl:function(){  // 控制音乐 ，上一首，下一首
            var This = this;
            // 上一首
            this.controlBtns[1].addEventListener("touchend",function(){
                player.music.status = "play"

                // console.log("click")
                This.loadMusic(This.indexObj.prev())
            });

            // 播放，暂停
            this.controlBtns[2].addEventListener("touchend",function(){
                if(player.music.status == "play"){  // 歌曲的状态
                    player.music.pause(); // 歌曲暂停
                    this.className = " "  //按钮变成暂停状态
                    This.imgStop()
                    
                }else{ // 此时歌曲的状态为暂停，点击后要播放
                    player.music.play();
                    this.className = "playing"

                    // 第二次播放的时候要加上上次旋转的角度，但是第一次的时候这个角度是没有的，取不到，所以做了一个容错处理
                    var deg = This.record.dataset.rotate || 0;
                    This.imgRotate(deg)
                }
            })

            // 下一首
            this.controlBtns[3].addEventListener("touchend",function(){
                player.music.status = "play"

                // console.log("click")
                This.loadMusic(This.indexObj.next())
            });
        },

        // 播放歌曲是，图片旋转
        imgRotate:function(deg){
            var This = this;

            clearInterval(this.rotataTimer)
            this.rotataTimer = setInterval(function(){
                deg = +deg + 0.2;   // 前面的+号是把字符串转为数字

                This.record.style.transform = "rotate("+deg+"deg)"
                This.record.dataset.rotate = deg  //把旋转角度存到标签身上，为了暂停后继续播放能够取到
            },1000 / 60)
        },

        // 图片停止旋转
        imgStop:function(){
            clearInterval(this.rotataTimer)
        } ,

        listPlay:function(){ // 列表切歌
            var This = this;
            this.list = player.listControl(this.dataList,this.wrap)
            
            //列表添加点击事件
        this.controlBtns[4].addEventListener("touchend",function(){
            This.list.slideUp()  //让列表显示出来
        });
        
        // 歌曲列表添加事件
        this.list.musicList.forEach(function(item,index){
            item.addEventListener("touchend",function(){
                //如果点击的是当前的那首歌，不管它是播放还是暂停都无效
                if(This.curIndex === index){
                    return
                }
                player.music.status = "play"; //歌曲要变成播放状态
                This.indexObj.index = index; //索引值对象身上的当前索引值要更新
                This.loadMusic(index); // 加载点击对用的索引值的那首歌曲
                //This.list.slideDown(); // 列表消失
            })
        })

        }

        
    }

    
    var musicPlayer = new MusicPlayer(document.getElementById("wrap"))
    musicPlayer.init()
})(window.Zepto,window.player)