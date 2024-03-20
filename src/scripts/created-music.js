export const navMusic = [
  {
    name: 'niganma',
    url: 'https://cdn.lovevuerk.com/ikun/music/niganma.mp3',
  },
  {
    name: 'ni',
    url: 'https://cdn.lovevuerk.com/ikun/music/ni.mp3',
  },
  {
    name: 'gan',
    url: 'https://cdn.lovevuerk.com/ikun/music/gan.mp3',
  },
  {
    name: 'aha',
    url: 'https://cdn.lovevuerk.com/ikun/music/aha.mp3',
  },
  {
    name: 'ai',
    url: 'https://cdn.lovevuerk.com/ikun/music/ai.mp3',
  },
  {
    name: 'yo',
    url: 'https://cdn.lovevuerk.com/ikun/music/yo.mp3',
  },
];

// 观察器的配置（需要观察什么变动）
const config = {
  attributes: true,
  childList: true,
  subtree: true,
};

// 创建音乐
function setMusic() {
  // 删除音频
  if (document.getElementsByClassName('avatarMusic')[0]) {
    document.body.removeChild(document.getElementsByClassName('avatarMusic')[0]);
  }

  // 循环创建音频
  navMusic.forEach((item) => {
    // 删除音频
    if (document.getElementsByClassName(item.name)[0]) {
      document.body.removeChild(document.getElementsByClassName(item.name)[0]);
    }

    const video = document.createElement('video');
    video.setAttribute('src', item.url);
    video.setAttribute('class', item.name);
    document.body.appendChild(video);
  });

  // 循环音频
  const mainNavList = document.getElementsByClassName('main-nav-list')[0];
  const navList = mainNavList.getElementsByClassName('nav-item link-item');
  let currentNav = 0;
  let i = 0;

  // 通过监听dom替换链接
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes') {
        const target = mutation.target;

        if (
          target.className.length > 0 &&
          target.className.indexOf('nav-item link-item') > -1 &&
          target.localName === 'li'
        ) {
          i++;

          // 超过数组长度重置为0
          if (i > navMusic.length - 1) {
            i = 0;
          }

          if (target.className.indexOf('music') > -1) {
            return;
          }
          const name = navMusic[i].name;

          target.classList.add('music');
          target.classList.add(name);

          let mouseover = () => {
            document.getElementsByClassName(name)[1].play();
          };
          target.removeEventListener('mouseover', mouseover);
          target.addEventListener('mouseover', mouseover);
        }
      }
    }
  });

  observer.observe(mainNavList, config);

  // 遍历导航链接
  navList.forEach((item, index) => {
    if (item.className.indexOf('music') > -1) {
      return;
    }

    if (item.localName !== 'li') {
      return;
    }

    // 超过数组长度重置为0
    if (currentNav > navMusic.length - 1) {
      currentNav = 0;
    }
    currentNav++;

    const name = navMusic[i].name;
    console.log(name);

    let mouseover = () => {
      document.getElementsByClassName(name)[1].play();
    };
    item.removeEventListener('mouseover', mouseover);
    item.addEventListener('mouseover', mouseover);

  });
}

// 初始化
function initData() {
  setMusic();
}
initData();
