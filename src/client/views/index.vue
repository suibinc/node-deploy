<template>
    <tabs tab-position="top" v-model="active">
        <tab-pane v-for="(r, i) in routes" :key="i" :label="r.title"/>
        <tab-pane label="权限管理"/>
        <tab-pane label="使用帮助"/>
    </tabs>
</template>

<script>
    import { TabPane, Tabs } from 'element-ui';
    import { GET_PROJECT_LIST, GET_USER_SCRIPT, GET_TASK_QUEUE, GET_HISTORY_LIST } from '../../library/utils/events';

    export default {
        components: {
            Tabs,
            TabPane
        },
        data() {
            return {
                timer: null,
                queue: [],
                active: 0,
                routes: [
                    {
                        path: '/index',
                        name: 'index',
                        title: '应用列表'
                    },
                    {
                        path: '/script',
                        name: 'script',
                        title: '脚本列表'
                    },
                    {
                        path: '/queue',
                        name: 'queue',
                        title: '构建队列'
                    },
                    {
                        path: '/build',
                        name: 'build',
                        title: '构建详情'
                    },
                    {
                        path: '/option',
                        name: 'option',
                        title: '全局设置'
                    }
                ]
            };
        },
        watch: {
            'active': 'tabChanged'
        },
        created() {
            this.$root.$on('tab-changed', active => {
                this.active = `${active}`;
            });
        },
        mounted() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(this.fetch, 2000);
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        methods: {
            send(event, message) {
                // this.$emit('send', event, message);
            },
            tabChanged(active, old) {
                if (active === old) return false;
                if (active < this.routes.length) {
                    this.$router.push(this.routes[active].path);
                }
            },
            fetch() {
                let active = Number(this.active);
                if (active === 0) {
                    this.send(GET_PROJECT_LIST);
                } else if (active === 1) {
                    this.send(GET_USER_SCRIPT);
                } else if (active === 2) {
                    this.send(GET_TASK_QUEUE);
                } else if (active === 3) {
                    this.send(GET_HISTORY_LIST);
                }
            }
        }
    };
</script>