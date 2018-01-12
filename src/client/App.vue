<template>
    <div id="app">
        <app-view @send="send"/>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import { UPDATE_PROJECT_LIST, UPDATE_USER_SCRIPT, UPDATE_USER_CONFIG } from './vuex/actions';
    import { GET_PROJECT_LIST, GET_USER_CONFIG, GET_USER_SCRIPT, SHOW_MESSAGE } from '../library/utils/events';

    import config from '../../build/config';

    import AppView from './views/index';

    export default {
        components: {
            AppView
        },
        data() {
            return {
                ready: false,
                socket: null,
                buildJson: {}
            };
        },
        mounted() {
            console.log('start running');

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

                this.socket.on(SHOW_MESSAGE, data => {
                    this.$message(data);
                });
            },
            send(event, message) {
                if (!this.ready) return false;
                console.log('socket emit', event, message);
                this.socket.emit(event, message || '');
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
        .status-primary {
            color: #409EFF;
            &:hover {
                color: #409EFF;
            }
        }
        .status-danger {
            color: #F56C6C;
            &:hover {
                color: #F56C6C;
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
        > .container {
            padding: 0 20px;
            h4 {
                font-size: 22px;
                font-weight: normal;
            }
        }
    }
</style>