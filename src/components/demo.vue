<template>
  <div>
    <el-container>
      <el-header>
      </el-header>
      <el-main align="center">
        <div id="img">
          <img :src="url" style="height: 100px;">
        </div>
      </el-main>
      <el-main align="center" style="color: white">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-main>
      <el-main align="center">
        <video
          id="myVideo"
          height="264"
          class="video-js"
        >
          <source
            src="https://ksv-video-publish.cdn.bcebos.com/cfcbe0b4462d1ec9b0272d56bc9fc27cdb3bb853.mp4?auth_key=1634453222-0-0-b3a2ace5da21013392243d29f4a566f6"
            type="video/mp4"
          >
        </video>
      </el-main>
      <el-main align="center" style="color: gainsboro">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: "TestTwo",
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        fits: 'none'
      };
    },
    mounted() {
      this.initVideo();
    },
    methods: {
      initVideo() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: false,
          //自动播放属性,muted:静音播放
          autoplay: true,
          muted: false,
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          fluid: true,
          breakpoints: {
            tiny: 300,
            xsmall: 400,
            small: 500,
            medium: 600,
            large: 700,
            xlarge: 800,
            huge: 900
          }
        });
        // 隐藏原有全屏按钮
        $(".vjs-fullscreen-control.vjs-control.vjs-button").css("display","none");
        // 手动添加全屏按钮
        $(".vjs-control-bar").append('<button class="vjs-fullscreen-control vjs-control vjs-button" type="button" title="Fullscreen" aria-disabled="false" id="danmu_send_opt" onclick="toggleFullScreen()"><span aria-hidden="true" class="vjs-icon-placeholder"></span></button>');
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
