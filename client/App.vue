<template>
    <div id="app">
        <tabs tab-position="left">
            <tab-pane label="工程列表">
                <build-list-view :list="buildJson.list" @compiler="handleCompiler"/>
            </tab-pane>
            <tab-pane label="构建队列">
                构建队列
            </tab-pane>
            <tab-pane label="构建详情">
                构建详情
            </tab-pane>
        </tabs>
    </div>
</template>

<script>
    import BuildJson from '../config/build-list';
    import { Row, Col, Tabs, TabPane } from 'element-ui';
    import BuildListView from './views/build-list';

    export default {
        components: {
            Row, Col, Tabs, TabPane, BuildListView
        },
        data() {
            return {
                buildJson: BuildJson
            };
        },
        mounted() {
            console.log('start');
        },
        methods: {
            handleCompiler(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>

<style lang="less">
    @import "./styles/index.css";

    body {
        min-height: 1000px;
        background: url("./img/bg.jpg") no-repeat;
        background-size: 100% 100%;
        * {
            margin: 0;
            padding: 0;
        }
    }

    #app {
        width: 1000px;
        min-height: 940px;
        padding: 30px;
        margin: 40px auto;
        border-radius: 6px;
        box-shadow: 0 0 4px #888;
        background: rgba(255, 255, 255, 0.9);
        .container {
            padding: 0 20px;
            h4 {
                font-size: 22px;
                font-weight: normal;
            }
        }
    }
</style>