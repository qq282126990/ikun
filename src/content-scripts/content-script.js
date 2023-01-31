// 注意，这里引入的vue是运行时的模块，因为content是插入到目标页面，对组件的渲染需要运行时的vue， 而不是编译环境的vue （我也不知道我在说啥，反正大概意思就是这样）
import Vue from 'vue/dist/vue.esm.js'
import ElementUI, { Message } from 'element-ui'
import { form as Data } from '../popup/utils'

Vue.use(ElementUI)

// 注意，必须设置了run_at=document_start此段代码才会生效

// // 在target页面中新建一个带有id的dom元素，将vue对象挂载到这个dom上。
// function insertFloat() {
//   let element = document.createElement('div');
//   let attr = document.createAttribute('id');
//   attr.value = 'appPlugin';
//   element.setAttributeNode(attr);
//   document.getElementsByTagName('body')[0].appendChild(element);

//   let link = document.createElement('link');
//   let linkAttr = document.createAttribute('rel');
//   linkAttr.value = 'stylesheet';
//   let linkHref = document.createAttribute('href');
//   linkHref.value = 'https://unpkg.com/element-ui/lib/theme-chalk/index.css';
//   link.setAttributeNode(linkAttr);
//   link.setAttributeNode(linkHref);
//   document.getElementsByTagName('head')[0].appendChild(link);

//   let left = 0;
//   let top = 0;
//   let mx = 0;
//   let my = 0;
//   let onDrag = false;

//   var drag = {
//     inserted: function (el) {
//       (el.onmousedown = function (e) {
//         left = el.offsetLeft;
//         top = el.offsetTop;
//         mx = e.clientX;
//         my = e.clientY;
//         if (my - top > 40) return;

//         onDrag = true;
//       }),
//       (window.onmousemove = function (e) {
//         if (onDrag) {
//           let nx = e.clientX - mx + left;
//           let ny = e.clientY - my + top;
//           let width = el.clientWidth;
//           let height = el.clientHeight;
//           let bodyWidth = window.document.body.clientWidth;
//           let bodyHeight = window.document.body.clientHeight;

//           if (nx < 0) nx = 0;
//           if (ny < 0) ny = 0;

//           if (ny > bodyHeight - height && bodyHeight - height > 0) {
//             ny = bodyHeight - height;
//           }

//           if (nx > bodyWidth - width) {
//             nx = bodyWidth - width;
//           }

//           el.style.left = nx + 'px';
//           el.style.top = ny + 'px';
//         }
//       }),
//       (el.onmouseup = function (e) {
//         if (onDrag) {
//           onDrag = false;
//         }
//       });
//     },
//   };

//   window.kz_vm = new Vue({
//     el: '#appPlugin',
//     directives: {
//       drag: drag,
//     },
//     template: `
//       <div class="float-page" ref="float" v-drag>
//         <el-card class="box-card" :body-style="{ padding: '15px' }">
//           <div slot="header" class="clearfix" style="cursor: move">
//             <span>悬浮窗</span>
//             <el-button style="float: right; padding: 3px 0" type="text" @click="toggle">{{ show ? '收起' : '展开'}}</el-button>
//           </div>
//           <transition name="ul">
//             <div v-if="show" class="ul-box">
//               <span> {{user}} </span>
//             </div>
//           </transition>
//         </el-card>
//       </div>
//       `,
//     data: function () {
//       return {
//         show: true,
//         list: [],
//         user: {
//           username: '',
//           follow: 0,
//           title: '',
//           view: 0,
//         },
//       };
//     },
//     mounted() {},
//     methods: {
//       toggle() {
//         this.show = !this.show;
//       },
//       sendMessage(data) {
//         chrome.runtime.sendMessage(data, function (response) {
//           console.log('收到来自后台的回复：' + response);
//         });
//       },
//     },
//   });
// }

let form = Data

// 设置头像
function setAvatar() {
  if (!document.getElementsByClassName('main-header-box')) {
    return
  }

  const nav = document.getElementsByClassName('main-header-box')[0]

  // 普通替换链接
  if (nav) {
    const avatar = nav.getElementsByClassName('avatar-wrapper')[0]

    const img = avatar.getElementsByTagName('img')[0]

    if (img) {
      img.src = form.avatar
    }
  }

  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  }

  // 通过监听dom替换链接
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const target = mutation.target

        if (
          target.className.length > 0 &&
          target.className.indexOf('avatar') > -1 &&
          target.src &&
          target.src !== form.avatar
        ) {
          target.src = form.avatar

          // 取消监听
          observer.disconnect()
        }
      }
    }
  })

  // 以上述配置开始观察目标节点
  observer.observe(nav, config)
}
// 设置头像
setAvatar()

// 设置背景
function setBg() {
  const bg = document.getElementById('juejin')

  bg.style.backgroundImage = `url(${form.bg})`
  bg.style.backgroundSize = '100px'
}
setBg()

// 初始化
function initData() {
  setAvatar()
  setBg()
}

// 监听插件返回数据
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 重新设置数据
  form = request

  // 初始化
  initData()
})
