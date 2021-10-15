<template>
  <div class='decision'>
    <!-- <button @click="refresh">刷新</button>
    <button @click="addNode">增加节点</button>
    <button @click="removeNode">删除节点</button>
    <button @click="redo">重做</button>
    <button @click="undo">回退</button>
    <button @click="focusCenterWithAnimate">聚焦</button> -->

    <button @click="setPlaybackRate">倍速</button>
    <video id='video' src="" autoplay controls></video>
    <div class="decision-canvas" id="dag-canvas"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { Canvas } from 'butterfly-dag';
// import 'butterfly-dag/dist/index.css';
// import mockData from '../mock/decision/data'
// import Node from '../mock/decision/node';

@Component
export default class Decision extends Vue {
  private canvas: any;
  private video: any;

  private mounted() {
    this.video = document.getElementById("video");
    // let root = document.getElementById('dag-canvas');
    // this.canvas = new Canvas({
    //   root: root,
    //   // layout: 'ForceLayout',                  // 布局设置(选填)，可使用集成的，也可自定义布局
    //   // layout: {},                             // 初始化自动布局(选填)
    //   zoomable: true,                         // 可放大
    //   moveable: true,                         // 可平移
    //   draggable: true,                       // 可拖动
    //   linkable: true,                        // 可连线
    //   disLinkable: true,                     // 可删除连线
    //   theme: {
    //     group: {
    //       type: 'normal'                      // 节点组类型(选填): normal(随意拖入拖出),inner(只能拖入不能拖出)
    //     },
    //     edge: {
    //       type: 'endpoint',                   // 线段连接类型
    //       shapeType: 'AdvancedBezier',        // 线条默认类型
    //       label: 'test',                      // 线条默认label
    //       arrow: true,                        // 线条默认是否带箭头
    //       rrowPosition: 0.5,                  // 箭头位置(0 ~ 1)
    //       arrowOffset: 0.0,                   // 箭头偏移
    //       // arrowShapeType: '',                 // 自定义箭头样式
    //       // Class: XXClass,                     // 自己拓展的class,拖动连线的时候会采用该拓展类
    //       isExpandWidth: false,               // 增加线条交互区域
    //       defaultAnimate: false               // 默认开启线条动画
    //     },
    //     endpoint: {
    //       position: [],                       // 限制锚点位置['Top', 'Bottom', 'Left', 'Right'],
    //       linkableHighlight: true,            // 连线时会触发point.linkable的方法，可做高亮
    //       limitNum: 10,                       // 限制锚点的连接数目
    //       expandArea: {                       // 锚点过小时，可扩大连线热区
    //         left: 10,
    //         right: 10,
    //         top: 10,
    //         botton: 10
    //       }
    //     },
    //     zoomGap: 0.001,                       // 鼠标放大缩小间隙设置
    //     autoFixCanvas: {                      // 节点拖动或连线拖动到画布边缘时，画布自动延展
    //       enable: false,
    //       autoMovePadding: [20, 20, 20, 20]   // 触发自动延展的画布内边距
    //     },
    //     autoResizeRootSize: true              // 自动适配root大小，默认为true
    //   },
    //   global: {                               // 自定义配置，会贯穿所有canvas，group，node，edge，endpoint对象
    //     isScopeStrict: false                  // scope是否为严格模式(默认为false)
    //   }
    // });

    // this.canvas.setGridMode(true, {
    //   isAdsorb: true,         // 是否自动吸附,默认关闭
    //   theme: {
    //     shapeType: 'line',     // 展示的类型，支持line & circle
    //     gap: 100,               // 网格间隙
    //     adsorbGap: 8,          // 吸附间距
    //     background: '#fff',     // 网格背景颜色
    //     lineColor: '#000',     // 网格线条颜色
    //     lineWidth: 1,          // 网格粗细
    //     circleRadiu: 1,        // 圆点半径
    //     circleColor: '#000'    // 圆点颜色
    //   }
    // });

    // this.canvas.setGuideLine(true, {
    //   limit: 1,             // 限制辅助线条数
    //   adsorp: {
    //     enable: false,      // 开启吸附效果
    //     gap: 5              // 吸附间隔
    //   },
    //   theme: {
    //     lineColor: 'red',   // 网格线条颜色
    //     lineWidth: 1,       // 网格粗细
    //   }
    // });

    
    // this.canvas.on('system.canvas.click', (data: any) => {
    //   console.log('system.canvas.click' ,data);
    //   // this.addNode()
    // });
    // this.canvas.on('system.node.click', (data: any) => {
    //   console.log('system.node.click' ,data);
    //   // alert(`node id is ${data?.node?.id} label is ${data?.node?.options?.label}`)
    //   this.canvas.focusNodeWithAnimate(data?.node?.id, 'node', {}, () => {
    //     this.canvas.zoom(1.5);
    //   })
    //   // this.addNode()
    // });

    // this.canvas.setMinimap(true, {
    //   height: 100,
    //   width: 100
    // });
    // this.canvas.draw(mockData, () => {
    //   // this.canvas.focusCenterWithAnimate();
    // });

    // this.canvas.draw(mockData, (data: any) => {
    //   console.log(data)
    // });

    // this.canvas.save2img({type: 'png', width: 1920, height: 1080, quality: 1})
    //   .then((dataUrl: any) => {
    //     var link = document.createElement('a');
    //     link.download = 'XXX.png';
    //     link.href = dataUrl;
    //     link.click();
    //   });

  }

  // private refresh() {
  //   this.canvas.redraw(mockData, (data: any) => {
  //     console.log(data)
  //   });
  // }

  // private addNode() {
  //   this.canvas.addNode({
  //     id: '13',
  //     label: 'huaqing',
  //     className: 'icon-background',
  //     iconType: 'icon-wo',
  //     top: 725,
  //     left: 720,
  //     Class: Node,
  //     endpoints: [{
  //       id: 'top',
  //       orientation: [0, -1],
  //       pos: [0.5, 0]
  //     }]
  //   })
  // }

  // private removeNode() {
  //   this.canvas.removeNode('13')
  // }

  // private redo() {
  //   this.canvas.redo();
  // }

  // private undo() {
  //   this.canvas.undo();
  // }

  // private focusCenterWithAnimate() {
  //   this.canvas.focusCenterWithAnimate();
  // }

  private setPlaybackRate() {
    console.log(this.video.playbackRate)
    console.log(window.navigator)
    try {
      this.video.playbackRate = 0.5;
    } catch (error) {
      console.log('error', error)
    }
  };
}
</script>

<style lang="less">
@import '~@/assets/less/theme.less';

.decision {
  width: 100%;
  height: 100%;

  video {
    width: 100vw;
    height: 30vh;
  }
  .decision-canvas {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .label {
    position: absolute;
    width: 38px;
    height: 22px;
    background: @butterfly-theme-color;
    text-align: center;
    border-radius: @butterfly-box-radius;
  }
}
</style>
