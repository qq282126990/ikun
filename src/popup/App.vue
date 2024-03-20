<template>
    <div class="ikun">
        <!-- title -->
        <div class="ikun-title">守护最好的鸽鸽🥚</div>
        <!-- 内容 -->
        <div class="ikun-content">
            <el-form ref="form" :model="form" label-width="100px">
                <!-- 头像链接 -->
                <el-form-item label="头像链接:">
                    <el-input v-model="form.avatar" clearable></el-input>
                </el-form-item>
                <!-- 背景链接 -->
                <el-form-item label="背景链接:">
                    <el-input v-model="form.bg" clearable></el-input>
                </el-form-item>
                <!-- 头像悬浮音频 -->
                <el-form-item label="头像悬浮音频:">
                    <el-input v-model="form.avatarMusic" clearable></el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 按钮 -->
        <div class="button-wrapper">
            <el-button class="button" type="primary" round @click="handleEnd">守护鸽鸽</el-button>
        </div>

        <!-- music -->
        <video :src="form.avatarMusic" autoplay v-show="false"></video>
    </div>
</template>

<script>
import { form } from './utils';

export default {
    name: 'App',
    data() {
        return {
            /**
             * 数据
             *
             * @type {Object}
             */
            form: {
                avatar: '',
                bg: '',
                radius: 0,
                avatarMusic: '',
            },
            /**
             * 初始化次数
             *
             * @type {Number}
             */
            initNumber: 1,
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        // 初始化
        initData() {
            this.form = form;
        },
        // 发送消息
        sendMessage(message) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, message);
            });
        },
        // 完成
        handleEnd() {
            this.sendMessage(this.form);
        },
    },
    // data() {
    //     return {
    //         message: '',
    //         list: [],
    //         open: false,
    //     };
    // },
    // created() {
    //     chrome.storage.sync.get('list', (obj) => {
    //         this.list = obj['list'];
    //     });
    // },
    // mounted() {
    //     chrome.runtime.onMessage.addListener(function (
    //         request,
    //         sender,
    //         sendResponse
    //     ) {
    //         console.log('收到来自content-script的消息：');
    //         console.log(request, sender, sendResponse);
    //         sendResponse(
    //             '我是后台，我已收到你的消息：' + JSON.stringify(request)
    //         );
    //     });
    // },
    // methods: {
    //     sendMessageToContentScript(message, callback) {
    //         chrome.tabs.query(
    //             { active: true, currentWindow: true },
    //             function (tabs) {
    //                 chrome.tabs.sendMessage(
    //                     tabs[0].id,
    //                     message,
    //                     function (response) {
    //                         if (callback) callback(response);
    //                     }
    //                 );
    //             }
    //         );
    //     },
    //     addComment() {
    //         this.sendMessageToContentScript(
    //             { cmd: 'addComment', message: this.message },
    //             function () {
    //                 console.log('来自content的回复：' + response);
    //             }
    //         );
    //     },
    // },
};
</script>

<style lang="scss">
body {
    margin: 0;
}
html {
    width: 400px;
}

.ikun {
    margin-bottom: 20px;

    // 标题
    &-title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        font-size: 16px;
        color: #fff;
        background: #4177f6;
    }

    // 内容
    &-content {
        margin-top: 20px;
        padding: 0 10px;
    }

    // 按钮
    .button-wrapper {
        padding: 0 50px;
    }

    .button {
        width: 100%;
        background-color: #4177f6;

        &:hover,
        &:focus {
            background-color: #4177f6;
            box-shadow: none;
        }
    }
}
</style>
