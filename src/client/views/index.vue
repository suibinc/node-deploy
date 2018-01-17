<template>
    <tabs tab-position="top" v-model="active">
        <tab-pane label="应用列表">
            <app-list-view @tab-changed="tabChanged" @send="send"/>
        </tab-pane>
        <tab-pane label="脚本列表">
            <script-list-view @tab-changed="tabChanged" @send="send"/>
        </tab-pane>
        <tab-pane label="构建队列">
            <build-queue-view :list="PROJECT_LIST" :queue="queue" @send="send"/>
        </tab-pane>
        <tab-pane label="构建详情">
            <build-detail-view/>
        </tab-pane>
        <tab-pane label="全局设置">
            <settings-view @send="send"/>
        </tab-pane>
        <tab-pane label="权限管理">
            <build-detail-view/>
        </tab-pane>
        <tab-pane label="使用帮助">
            <build-detail-view/>
        </tab-pane>
    </tabs>
</template>

<script>
    import { Col, Row, TabPane, Tabs } from 'element-ui';
    import { mapGetters } from 'vuex';
    import { GET_PROJECT_LIST, GET_USER_SCRIPT } from '../../library/utils/events';
    import AppListView from './app-list';
    import BuildDetailView from './detail';
    import BuildQueueView from './queue';
    import ScriptListView from './script-list';
    import SettingsView from './settings';

    export default {
        components: {
            Row,
            Col,
            Tabs,
            TabPane,
            AppListView,
            ScriptListView,
            BuildQueueView,
            BuildDetailView,
            SettingsView
        },
        data() {
            return {
                timer: null,
                queue: [],
                active: 0
            };
        },
        computed: {
            ...mapGetters(['PROJECT_LIST', 'USER_SCRIPT'])
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
                this.$emit('send', event, message);
            },
            tabChanged(active) {
                this.active = `${active}`;
            },
            fetch() {
                console.log('active', this.active);
                let active = Number(this.active);
                if (active === 0) {
                    this.send(GET_PROJECT_LIST);
                } else if (active === 1) {
                    this.send(GET_USER_SCRIPT);
                }
            }
        }
    };
</script>