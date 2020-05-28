<template>
  <div align="center">
    <div :style="{'width':divWith}">
      <el-container>
        <el-header height="0px">
        </el-header>
        <el-main align="center" style="padding:0">
          <img :src="upUrl" width="100%">
        </el-main>
        <el-main align="center" style="padding:0">
          <div id="mse" width="100%"></div>
          <div id="mse2" width="100%"></div>
        </el-main>
        <el-main align="center" style="padding: 0">
          <img :src="downUrl" width="100%">
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script>
  import Player from 'xgplayer'
  import FlvJsPlayer from 'xgplayer-flv.js';

  export default {
    name: "TestTwo",
    data() {
      return {
        upUrl: 'https://kaixuan-video.oss-cn-shanghai.aliyuncs.com/up.jpg',
        downUrl: 'https://kaixuan-video.oss-cn-shanghai.aliyuncs.com/down.jpg',
        fits: 'none',
        // videoUrl: 'http://kaixuan-video.oss-cn-shanghai.aliyuncs.com/1588517044001627.mp4',
        divWith: '100%',
        flvHeight: this.divWith / 1.78,
        vedioTime: 0,
        isRotateFullscreen: true,
      };
    },
    mounted() {
      var time = new Date().getTime()
      if (window.innerWidth > 1000) {
        this.divWith = '600px';
        this.isRotateFullscreen = false
      }
       var playTime= time-1590594660000
       var vedioTime= 152;
      if (playTime>=0 && playTime <= vedioTime*1000) {
        this.vedioTime = playTime/1000;
        console.log("直播")
        this.initVideo();
      } else if(playTime > vedioTime*1000){
        this.reloadVedio();
        console.log("录播")
      }else {
        console.log("未开播")
        var delayTime=1590594660000-time;
        console.log(delayTime)
        setTimeout(this.initVideo,delayTime)
      }
    },
    methods: {
      initVideo() {
        console.log("开播")
        let player = new FlvJsPlayer({
          id: 'mse',
          "autoplay": true,
          type: 'mp4',
          url: 'http://kaixuan-video.oss-cn-shanghai.aliyuncs.com/t1.mp4',
          // cssFullscreen: true,
          isLive: true,
          // loop: true,
          // duration: 30,
          // filesize: 1000,
          // ignores: ['fullscreen'],
          cors: true,
          width: this.divWith,
          height: this.flvHeight,
          "playsinline": true,
          rotateFullscreen: this.isRotateFullscreen,
          closeVideoClick: true,
          closeVideoTouch: true

        });
        player.once('canplay', () => {
          player.currentTime = this.vedioTime;
        })
        player.once('ended', () => {
          console.log("销毁视频")
          player.destroy()
        })
        player.once('destroy', () => {
          console.log("调用重置vedio")
          this.reloadVedio()
        })
      },
      reloadVedio() {
        console.log("开始重置")
        let player = new Player({
          id: 'mse2',
          "autoplay": true,
          type: 'mp4',
          url: 'http://kaixuan-video.oss-cn-shanghai.aliyuncs.com/1588517044001627.mp4',
          // cssFullscreen: true,
          loop: true,
          controls: true,
          // duration: 30,
          // filesize: 1000,
          // ignores: ['fullscreen'],
          cors: true,
          width: this.divWith,
          height: this.flvHeight,
          "playsinline": true,
          // rotateFullscreen: this.isRotateFullscreen,
          closeVideoClick: true,
          closeVideoTouch: true
        });
        console.log("重置完成")
      }
    }
  };
</script>
<style>
  body {
    background-color: black;
    margin: 0;
  }

  /*#img, #img2 {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*}*/

  /*.text {*/
  /*  text-align:justify; text-justify:inter-ideograph;*/
  /*  width:90%;*/
  /*  padding: 0 0 0 0;*/
  /*}*/
  /*.span_hid{ display:inline-block; width:100%;}*/
</style>
