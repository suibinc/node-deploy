<template>
    <div id="app">
        <app-view/>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import { UPDATE_APPLICATIONS } from './vuex/actions';

    import config from '../../build/config';

    import AppView from './views/index';
    import store from '../library/fetch';

    export default {
        components: {
            AppView
        },
        data() {
            return {
                socket: null,
                buildJson: {}
            };
        },
        mounted() {
            console.log('start running');

            this.socket = io(`http://localhost:${config.SOCKET_PORT}`);
            this.socket.on('connect', data => {
                console.log(data);
                this.send('application', 'fasdfasfasfasdfas');
            });
            this.initial();
        },
        methods: {
            initial() {
                this.socket.on('application', data => {
                    console.log('------', data);
                    this.$store.dispatch({
                        type: UPDATE_APPLICATIONS,
                        list: data
                    });
                });
            },
            send(event, message) {
                this.socket.emit(event, message);
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