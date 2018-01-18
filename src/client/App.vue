<template>
    <div id="app">
        <router-tabs/>
        <router-view/>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import {
        UPDATE_PROJECT_LIST,
        UPDATE_USER_SCRIPT,
        UPDATE_USER_CONFIG,
        UPDATE_TASK_QUEUE,
        UPDATE_HISTORIES,
        UPDATE_BUILD_INFO
    } from './vuex/actions';
    import {
        GET_PROJECT_LIST,
        GET_USER_CONFIG,
        GET_USER_SCRIPT,
        GET_TASK_QUEUE,
        GET_HISTORY_LIST,
        GET_BUILD_INFO,
        SHOW_MESSAGE
    } from '../library/utils/events';

    import config from '../../build/config';

    import RouterTabs from './views/index';

    export default {
        components: {
            RouterTabs
        },
        data() {
            return {
                ready: false,
                socket: null,
                buildJson: {}
            };
        },
        created() {
            this.$root.$on('send', this.send);
            this.$root.$on('get-histories', this.getHistories);
            this.$root.$on('get-build-info', this.getBuildInfo);
        },
        mounted() {
            this.socket = io(`http://localhost:${config.SOCKET_PORT}`);
            this.socket.on('connect', data => {
                this.ready = true;
                this.send(GET_PROJECT_LIST);
                this.send(GET_USER_CONFIG);
                this.send(GET_USER_SCRIPT);
            });
            this.initial();
        },
        methods: {
            initial() {
                this.socket.on(GET_PROJECT_LIST, data => {
                    this.$store.dispatch({
                        type: UPDATE_PROJECT_LIST,
                        list: data
                    });
                });

                this.socket.on(GET_USER_SCRIPT, data => {
                    this.$store.dispatch({
                        type: UPDATE_USER_SCRIPT,
                        data: data
                    });
                });

                this.socket.on(GET_USER_CONFIG, data => {
                    this.$store.dispatch({
                        type: UPDATE_USER_CONFIG,
                        data: data
                    });
                });

                this.socket.on(GET_TASK_QUEUE, data => {
                    this.$store.dispatch({
                        type: UPDATE_TASK_QUEUE,
                        list: data
                    });
                });

                this.socket.on(GET_HISTORY_LIST, data => {
                    this.$store.dispatch({
                        type: UPDATE_HISTORIES,
                        list: data
                    });
                });

                this.socket.on(GET_BUILD_INFO, data => {
                    this.$store.dispatch({
                        type: UPDATE_BUILD_INFO,
                        info: data
                    });
                });

                this.socket.on(SHOW_MESSAGE, data => {
                    this.$message(data);
                });
            },
            send(event, message) {
                if (!this.ready) return false;
                console.log('socket emit', event, message);
                this.socket.emit(event, message || '');
            },
            getHistories(uuid) {
                if (!uuid) return false;
                this.send(GET_HISTORY_LIST, {
                    uuid: uuid
                });
            },
            getBuildInfo(uuid) {
                if (!uuid) return false;
                this.send(GET_BUILD_INFO, {
                    uuid: uuid
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
            outline: none;
        }
        .clear-fix {
            &:after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                clear: both;
            }
        }
        .status-primary {
            color: #409EFF;
            &:hover {
                color: #409EFF !important;
            }
        }
        .status-danger {
            color: #F56C6C;
            &:hover {
                color: #F56C6C !important;
            }
        }
    }

    #app {
        width: 1000px;
        min-height: 960px;
        padding: 10px 30px 30px 30px;
        margin: 40px auto;
        border-radius: 6px;
        box-shadow: 0 0 4px #888;
        background: rgba(255, 255, 255, 0.9);
        .el-dialog__wrapper {
            .el-dialog {
                width: 800px;
            }
            &.small .el-dialog {
                width: 600px;
            }
        }
    }
</style>