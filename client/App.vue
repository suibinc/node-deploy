<template>
    <div id="app">
        <tabs tab-position="left" v-model="active">
            <tab-pane label="工程列表">
                <build-list-view :list="buildJson.list" @tab-changed="handleActive"/>
            </tab-pane>
            <tab-pane label="构建队列">
                <build-queue-view :list="buildJson.list" :queue="queue"/>
            </tab-pane>
            <tab-pane label="构建详情">
                <build-detail-view/>
            </tab-pane>
        </tabs>
    </div>
</template>

<script>
    import store from '../library/fetch';
    import BuildJson from '../config/build-list';
    import { Row, Col, Tabs, TabPane } from 'element-ui';
    import BuildListView from './views/build-list';
    import BuildQueueView from './views/queue';
    import BuildDetailView from './views/detail';

    export default {
        components: {
            Row, Col, Tabs, TabPane, BuildListView, BuildQueueView, BuildDetailView
        },
        data() {
            return {
                buildJson: BuildJson,
                queue: [],
                timer: null,
                active: 0
            };
        },
        mounted() {
            console.log('start');
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(this.handleQueue, 1000);
        },
        methods: {
            handleActive(index) {
                this.active = `${index}`;
            },
            handleQueue() {
                store.fetchGet('/build/queue').then(data => {
                    if (data.code === 0) {
                        this.queue = data.result;
                    }
                });
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