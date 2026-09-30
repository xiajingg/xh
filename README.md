# xh

一场线上直播活动的 H5 观看页（移动端优先）。

> 2020 年 6 月的活动项目。开播时间写死在代码里，活动结束后页面固定进入「录播」状态。
> 属于一次性活动页，目前已停更。

## 这是什么

一个只做一件事的 Vue 2 单页应用：**在指定时间播放一场直播**，并根据真实时钟自动在
「预告 / 直播 / 录播」三种状态之间切换。

页面自上而下只有三块：

1. 顶部海报图
2. 播放器区域（三个容器，分别承载预告 / 直播 / 录播）
3. 底部图

## 核心逻辑

全部业务逻辑集中在 `src/components/demo.vue` 一个文件里（约 5KB）。

页面 `mounted` 时计算 `playTime = 当前时间 - 开播时间`，据此决定进入哪个状态：

| 条件 | 状态 | 行为 |
| --- | --- | --- |
| `playTime < 0` | 预告 | 循环播放预告片，并用 `setTimeout` 在开播时刻自动切换到直播 |
| `0 <= playTime <= 视频时长` | 直播 | 播放正片，并把**已经过去的时间**作为播放进度 seek 过去 |
| `playTime > 视频时长` | 录播 | 循环播放完整正片 |

关键参数（均硬编码在 `demo.vue` 中）：

| 参数 | 值 |
| --- | --- |
| 开播时间 | 2020-06-02 20:30（时间戳 `1591101000000`） |
| 视频时长 | 1134 秒（约 19 分钟） |
| 视频托管 | 阿里云 OSS |

> **这不是真正的推流直播。** 没有服务端推流、没有 FLV 直播流，只是把 mp4 的时间轴
> 对齐到真实时钟来模拟直播进度 —— 一种成本极低的伪直播方案。对一次性活动来说，
> 这样省掉了推流服务器和 CDN 直播费用。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | Vue 2.5 |
| 路由 | vue-router 3（仅一条路由 `/`） |
| UI 组件 | Element UI 2.13（使用自定义主题） |
| 视频播放 | xgplayer + xgplayer-flv.js（西瓜视频播放器） |
| 构建 | webpack 3 + vue-cli 2 模板（`build/` + `config/`） |
| 其他 | 微信 JS-SDK（jweixin）、CNZZ 统计 |

## 目录结构

```
├── build/                 # webpack 构建配置（vue-cli 2 模板）
├── config/                # 环境与开发服务器配置
├── src/
│   ├── main.js            # 入口
│   ├── Appa.vue           # 根组件（未使用，实际入口是 components/demo.vue）
│   ├── components/
│   │   └── demo.vue       # ★ 全部业务逻辑：三种播放状态的判断与切换
│   ├── router/index.js    # 路由（只有首页）
│   ├── theme-et/          # Element UI 自定义主题编译产物（100+ 个 CSS 文件）
│   └── assets/
├── test/                  # 单元测试与 e2e 测试（vue-cli 模板自带，未实际使用）
├── element-variables.scss # Element UI 主题变量
└── index.html
```

## 运行

```bash
npm install
npm run dev     # 开发服务器，默认 http://localhost:8080
npm run build   # 生产构建
```

**Node 版本注意**：项目基于 webpack 3，在 Node 17 及以上会因 OpenSSL 3 报
`ERR_OSSL_EVP_UNSUPPORTED`。两种解决办法：

```bash
# 方案一：加兼容参数（Node 17+）
NODE_OPTIONS=--openssl-legacy-provider npm run dev

# 方案二：切换到 Node 14 及以下
nvm use 14
```

## 注意事项

- **开播时间已过期**：`zhiboTime` 是硬编码常量，当前时间已远超它，页面只会进入「录播」分支无限循环正片。要复用此项目需修改该常量。
- **「直播」分支的实现存疑**：该分支使用 `FlvJsPlayer`（FLV 直播播放器），但加载的是 `.mp4` 文件且 `type: 'mp4'`，与播放器定位不符，疑似方案调整后未清理。
- **仓库体积主要来自主题文件**：`src/theme-et/` 是 Element UI 主题的编译产物，100+ 个 CSS 文件占了仓库绝大部分体积，也是 GitHub 将本仓库语言识别为 CSS 的原因。
- **统计脚本通过 `document.write` 注入**，属于早期写法。
- **依赖多为 2017–2020 年版本**，有若干 dependabot 升级 PR 长期未处理。
