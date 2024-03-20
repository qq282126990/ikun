import Vue from 'vue/dist/vue.esm.js';
import ElementUI from 'element-ui';
import { form as Data } from '../popup/utils';

Vue.use(ElementUI);

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

// 初始化一次数据
if (!localStorage.getItem('ikun-data')) {
  localStorage.setItem('ikun-data', JSON.stringify(Data));
}

let form = JSON.parse(localStorage.getItem('ikun-data'));

if (form.type) {
  localStorage.setItem('ikun-data', JSON.stringify(Data));

  form = Data;
}

// 观察器的配置（需要观察什么变动）
const config = {
  attributes: true,
  childList: true,
  subtree: true,
};

// 设置头像
function setAvatar() {
  if (!document.getElementsByClassName('main-header-box')) {
    return;
  }

  const nav = document.getElementsByClassName('main-header-box')[0];

  // 普通替换链接
  if (nav) {
    const avatar = nav.getElementsByClassName('avatar-wrapper')[0];

    const img = avatar.getElementsByTagName('img')[0];

    if (img) {
      img.classList.add('ikun-rotate');
      img.src = form.avatar;
    }
  }

  // 通过监听dom替换链接
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const target = mutation.target;

        if (
          target.className.length > 0 &&
          target.className.indexOf('avatar') > -1 &&
          target.src &&
          target.src !== form.avatar
        ) {
          target.src = form.avatar;
          target.classList.add('ikun-rotate');

          // 头像鼠标进入
          target.addEventListener('mouseover', () => {
            document.getElementsByClassName('niganma')[0].play();
          });

          // 取消监听
          observer.disconnect();
        }
      }
    }
  });

  // 以上述配置开始观察目标节点
  observer.observe(nav, config);
}

// 设置背景
function setBg() {
  const bg = document.getElementById('juejin');

  bg.style.backgroundImage = `url(${form.bg})`;
  bg.style.backgroundSize = '100px';
}

// 修改签到文案
function checkIn() {
  // 签到外层
  const checkWrapper = document.getElementsByClassName('signin-tip signin')[0];

  if (!checkWrapper) {
    return;
  }

  // 描述
  const desc =
    '一个真正的man，一个真正的男人他 清楚自己要做什么，如果你真的想看这一个人 是一个男孩，还是一个男人不要去看他的baby， 看他的心 music～💗';

  // 通过监听dom替换链接
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const target = mutation.target;

        // 修改签到文案
        if (target.className.indexOf('signedin-btn') > -1) {
          if (target.firstChild.innerText === '已签到') {
            target.firstChild.innerText = '已下🥚';
          }

          if (target.firstChild.innerText === '去签到') {
            target.firstChild.innerText = '去下🥚';
          }
        }

        if (target.className.indexOf('first-line') > -1) {
          target.style.alignItems = 'flex-start';
        }

        if (
          target.className.indexOf('second-line') > -1 &&
          target.innerText !== desc
        ) {
          target.innerText =
            '一个真正的man，一个真正的男人他 清楚自己要做什么，如果你真的想看这一个人 是一个男孩，还是一个男人不要去看他的baby， 看他的心 music～💗';
        }
      }
    }
  });

  // 以上述配置开始观察目标节点
  observer.observe(checkWrapper, config);
}

// 修改右侧固定图标
function setSidebar() {
  // 固定栏
  const globalComponentBox = document.getElementsByClassName(
    'global-component-box'
  )[0];

  // 通过监听dom替换链接
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const target = mutation.target;

        // 侧边栏
        if (target.className.indexOf('to-top-btn') > -1 && target.children[0]) {
          target.removeChild(target.children[0]);
          target.innerText = '🥚';
        }
      }
    }
  });

  observer.observe(globalComponentBox, config);
}

// 页面圆角
function setRadius() {
  document.getElementsByTagName('body')[0].className = '';

  // 开启圆角
  if (form.radius === 1) {
    document.getElementsByTagName('body')[0].className = 'ikun-radius';
  }
}

// 修改创作中心
function setCreationCenter() {
  const searchAdd = document.getElementsByClassName('right-side-nav')[0];
  searchAdd.getElementsByClassName('add-btn')[0].innerText = '制作人中心';

  const placeholder = '全民制作人大家好👋...';

  // 通过监听dom替换链接
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const target = mutation.target;
        // 侧边栏
        if (
          target.localName === 'button' &&
          target.className.indexOf('add-btn') > -1
        ) {
          target.innerText = '制作人中心';
        }

        // 搜索框
        if (
          target.localName === 'input' &&
          target.className.indexOf('search-input') > -1 &&
          target.placeholder !== placeholder
        ) {
          target.placeholder = placeholder;
        }
      }
    }
  });

  observer.observe(searchAdd, config);
}

// 初始化
function initData() {
  setAvatar();
  setBg();
  checkIn();
  setSidebar();
  setRadius();
  setCreationCenter();
}
initData();

// 监听插件返回数据
chrome.runtime.onMessage.addListener((request) => {
  localStorage.setItem('ikun-data', JSON.stringify(request));

  // 重新设置数据
  form = request;

  // 初始化
  initData();
});
