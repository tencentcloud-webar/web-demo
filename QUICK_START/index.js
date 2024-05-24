import { ArSdk } from 'tencentcloud-webar';
import sha256 from 'sha256';

/** ----- 鉴权配置 ----- */

/**
 * 腾讯云账号 APPID
 * 
 * 进入[腾讯云账号中心](https://console.cloud.tencent.com/developer) 即可查看 APPID
 */
const APPID = '' // '您的appid';

/**
 * Web LicenseKey
 * 
 * 登录音视频终端 SDK 控制台的[Web License 管理](https://console.cloud.tencent.com/vcube/web)，创建项目即可获得 LicenseKey
 */
const LICENSE_KEY = '' // '您的licenseKey';

/**
 * 计算签名用的密钥 Token
 * 
 * 注意：此处仅用于 DEMO 调试，正式环境中请将 Token 保管在服务端，签名方法迁移到服务端实现，通过接口提供，前端调用拉取签名，参考
 * [签名方法](https://https://cloud.tencent.com/document/product/616/71370#.E7.AD.BE.E5.90.8D.E6.96.B9.E6.B3.95)
 */
const token = '' // '您的token';
/** ----------------------- */


/**
 * 获取签名方法
 * 
 * 注意：此处仅用于 DEMO 调试，正式环境中请将 Token 保管在服务端，签名方法迁移到服务端实现，通过接口提供，前端调用拉取签名，参考
 * [签名方法](https://https://cloud.tencent.com/document/product/616/71370#.E7.AD.BE.E5.90.8D.E6.96.B9.E6.B3.95)
 * 
 * 如：
 * async function () {
 *  return fetch('http://xxx.com/get-ar-sign').then(res => res.json());
 * };  
 */
const getSignature = function () {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = sha256(timestamp + token + APPID + timestamp).toUpperCase();
  return { signature, timestamp };
};

let width = 405;
let height = 720;

const makeups = [];
const stickers = [];
const filters = [];

const ar = new ArSdk({
  module: {
    beautify: true,
    segmentation: true
  },
  auth: {
    authFunc: getSignature,
    appId: APPID, 
    licenseKey: LICENSE_KEY
  },
  camera: {
    width,
    height,
    mirror: true,
  },
  // 内置 Loading 配置
  loading: {
    enable: true,
    lineWidth: 4,
  },
  // 初始美颜效果
  beautify: {
    whiten: 0.4, // 美白 0-1
    dermabrasion: 0.5, // 磨皮 0-1
    lift: 0.3, // 瘦脸 0-1
    shave: 0, // 削脸 0-1
    eye: 0, // 大眼 0-1
    chin: 0, // 下巴 0-1
  },
});


// 鉴权完成
ar.on('created', () => {
  
  // 获取内置贴纸，美妆
  ar.getEffectList({
    Type: 'Preset',
  }).then((res) => {
    const list = res.map(item => ({
      name: item.Name,
      id: item.EffectId,
      cover: item.CoverUrl,
      url: item.Url,
      label: item.Label,
      type: item.PresetType,
    }));
    console.log('list',list)
    makeups.push(...list.filter(item=>item.label.indexOf('美妆')>=0));
    stickers.push(...list.filter(item=>item.label.indexOf('贴纸')>=0));
  })
    .catch((e) => {
      console.log(e);
    });

  // 获取内置滤镜
  ar.getCommonFilter().then((res) => {
    const list = res.map(item => ({
      name: item.Name,
      id: item.EffectId,
      cover: item.CoverUrl,
      url: item.Url,
      label: item.Label,
      type: item.PresetType,
    }));
    filters.push(...list);
  })
    .catch((e) => {
      console.log(e);
    });
});

ar.on('ready', async (e) => {
  // 获取输出流
  const mediaStream = await ar.getOutput();
  const video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.crossOrigin = 'anonymous';
  document.body.appendChild(video);
  video.addEventListener('canplay', () => {
    video.play();
  });
  video.srcObject = mediaStream;
  
  // 设置美妆及贴纸
  ar.setEffect([{
    id: makeups[0].id,
    intensity: 1,
    filterIntensity: 0 // 单独设置滤镜强度

  }, stickers[0].id]);
  // 设置滤镜
  ar.setFilter(filters[0].id);
});

ar.on('error', (e) => {
  console.log(e);
});
