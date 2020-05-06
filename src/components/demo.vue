<template>
  <div align="center">
    <div :style="{'width':divWith}">
      <el-container>
        <el-header height="10px">
        </el-header>
        <el-main align="center">
          <div id="img">
            <img :src="url" style="height: 80px;">
          </div>
        </el-main>
        <el-main align="center" style="color: white">XXXXXXXXXXXXXXX
          XXXXXXXXXXXXXXXX
        </el-main>
        <el-main align="center">
          <div id="mse" align="center"></div>
        </el-main>
        <el-main align="center" style="color: gainsboro">XXXXXXXXXXXXXXXXXXXXXXXX</el-main>
      </el-container>
    </div>
  </div>
</template>
<!--<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>-->

<script>
  import Player from 'xgplayer'
  export default {
    name: "TestTwo",
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        fits: 'none',
        videoUrl: 'http://kaixuan-video.oss-cn-shanghai.aliyuncs.com/1588517044001627.mp4',
        divWith: '100%'
      };
    },
    mounted() {
      var time = new Date().getTime()
      if (window.innerWidth > 1000) {
        this.divWith = '600px';
      }
      if (time > 1588559004000) {
        this.initVideo();
      } else {
        alert('false')
      }
    },
    methods: {
      initVideo() {
        let player = new Player({
          id: 'mse',
          url: 'http://kaixuan-video.oss-cn-shanghai.aliyuncs.com/1588517044001627.mp4',
          autoplay: true,
          loop: true,
          ignores: ['progress', 'time', 'fullscreen','loading'],
          "playsinline": true,
          "whitelist": [
            ""
          ],
          "autoplay": true,
          "fluid": true,
          "volume": 1,
          "x5-video-player-type": "h5",
          "x5-video-orientation": "landscape",
          "x5-video-player-fullscreen": "false",
          playsinline: true,
          cssFullscreen: true,
          poster: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2676242820,1295870088&fm=85&app=92&f=JPEG?w=121&h=75&s=7BA4AF465030738C987B577903009078',
        });
      }
    }
  };
</script>
<style>
  body {
    background-color: black;
  }

  #img {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
