本 SDK 主要功能在于提供给您快速、安全地接入 [Web 美颜特效](https://cloud.tencent.com/document/product/616/71399)，并使用所有功能。

## 流程说明

SDK 实现了简洁低侵入性的接口提供接入，您只需要初始化实例，将渲染节点添加到自己的页面即可快速实现 **Web 美颜特效**功能。
![流程图](https://qcloudimg.tencent-cloud.cn/raw/13289a5bcf4b36ab2bc77b42390ea9ac.png)

## 安装

本 SDK 使用 npm 包提供 Web 端与微信小程序的 SDK。

```
npm install tencentcloud-webar
```

## 接入 SDK

本 SDK 在微信小程序和 Web 端的初始化方式略有差异，本文只做 Web 端接入介绍。

- 小程序接入请参见 [小程序端接入](https://cloud.tencent.com/document/product/616/75675)。
- Web 端我们提供了内置 Camera 与自定义流两种初始化方式。
  - [内置相机与播放器](https://cloud.tencent.com/document/product/616/75678)：使用了内置的摄像头与播放器封装，调用简单迅速。
  - [自定义流接入](https://cloud.tencent.com/document/product/616/75679)：适用于有自己维护媒体流的需求或者要求更高的灵活性与可控性的场景。

## 设置美颜和特效

SDK 的所有素材均兼容微信小程序端与 Web 端，调用方式一致，详情可参见 [设置美颜和特效](https://cloud.tencent.com/document/product/616/75680)。

## 使用人像分割（虚拟背景）

借助人像分割能力实现虚拟背景效果，详情可参见 [使用人像分割（虚拟背景）](https://cloud.tencent.com/document/product/616/76112)。

## 使用表情和虚拟形象

Animoji 表情和 VR 虚拟形象功能，详情可参见 [使用表情和虚拟形象](https://cloud.tencent.com/document/product/616/80796)。

## 参数与方法说明

参见 [API 文档](https://cloud.tencent.com/document/product/616/75676)。

## 兼容性

| 浏览器       | 支持平台                       |
| ------------ | ------------------------------ |
| Chrome       | 桌面端、Android、iOS           |
| Safari       | 桌面端、Android、iOS           |
| FireFox      | 桌面端、Android、iOS           |
| QQ webview   | Android                        |
| 微信 webview | Android/iOS 微信 8.0.16 以上   |
| 微信小程序   | Android/iOS 微信 8.0.16 以及上 |

更多平台兼容相关信息，请参考 [产品概述 - Web 端](https://cloud.tencent.com/document/product/616/11209)
