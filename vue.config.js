module.exports = {
  lintOnSave: false,
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup',
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js',
        },
        contentScripts: {
          entries: {
            // 主文件
            'content-script': ['src/scripts/content-script.js'],
            // 创建音乐
            'created-music': ['src/scripts/created-music.js'],
          },
        },
      },
    },
  },
};
