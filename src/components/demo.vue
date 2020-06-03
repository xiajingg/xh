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
<!--          直播-->
          <div id="mse" width="100%"></div>
<!--          录播-->
          <div id="mse2" width="100%"></div>
<!--          预告片-->
          <div id="mse3" width="100%"></div>
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
        isRotateFullscreen: true,
        yugao: '',
        player:'',
        // 直播开始时间
        zhiboTime: 1591101000000,
        // 当前时间
        time: new Date().getTime(),
        // 视频时长
        videoTime: 1134
      };
    },
    mounted() {
      document.write(unescape("%3Cspan hidden id='cnzz_stat_icon_1278953998'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D1278953998' type='text/javascript'%3E%3C/script%3E"));
      if (window.innerWidth > 1000) {
        this.divWith = '600px';
        this.isRotateFullscreen = false
      }
       var playTime= this.time-this.zhiboTime
      console.log(playTime)
      // 当前时间 - 开始时间> 0 并且 小于等于视频时间 就开始直播
      if (playTime>=0 && playTime <= this.videoTime*1000) {
        this.videoTime = playTime/1000;
        console.log("直播"+ this.videoTime)
        this.initVideo();
      //  当前时间 - 开始时间> 视频时间 就开始录播
      } else if(playTime > this.videoTime*1000){
        this.reloadVideo();
        console.log("录播")
      //  当前时间 - 开始时间 < 0  预告
      }else {
        console.log("预告")
        this.yugaoVideo();
      }
    },
    methods: {


      // 开始视频
      initVideo() {
        if (this.yugao!=''){
          this.yugao.destroy();
          this.videoTime = 0 ;
        }
        console.log("开播")
        this.player = new FlvJsPlayer({
          id: 'mse',
          autoplay: true,
          type: 'mp4',
          url: 'https://kaixuan-video.oss-cn-shanghai.aliyuncs.com/prod_0603.mp4',
          isLive: true,
          cors: true,
          width: this.divWith,
          height: this.flvHeight,
          playsinline: true,
          rotateFullscreen: this.isRotateFullscreen,
          closeVideoClick: true,
          closeVideoTouch: true

        });
        this.player.once('canplay', () => {
          this.player.currentTime = parseInt(this.videoTime);
        })
        this.player.once('ended', () => {
          console.log("销毁视频")
          this.player.destroy()
        })
        this.player.once('destroy',()=>{
          this.reloadVideo()
        })
      },


      // 播放完重播
      reloadVideo() {
        console.log("开始重置")
        let player2 = new Player({
          id: 'mse2',
          autoplay: true,
          type: 'mp4',
          url: 'https://kaixuan-video.oss-cn-shanghai.aliyuncs.com/prod_0603.mp4',
          // cssFullscreen: true,
          loop: true,
          controls: true,
          cors: true,
          width: this.divWith,
          height: this.flvHeight,
          playsinline: true,
          closeVideoClick: true,
          closeVideoTouch: true
        });
        console.log("重置完成")
      },

      //  预告
      yugaoVideo() {
        console.log("开始预告")
        this.yugao = new Player({
          id: 'mse3',
          "autoplay": true,
          type: 'mp4',
          url: 'https://kaixuan-video.oss-cn-shanghai.aliyuncs.com/newtrailer.mp4',
          loop: true,
          cors: true,
          width: this.divWith,
          height: this.flvHeight,
          "playsinline": true,
          closeVideoClick: true,
          closeVideoTouch: true
        });
        console.log("预告完成")
        console.log(this.zhiboTime)
        console.log(this.time)
        let delayTime=this.zhiboTime-this.time;
        console.log(delayTime)
        setTimeout(()=>{this.initVideo()},delayTime)
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
