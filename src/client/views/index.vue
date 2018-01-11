<template>
    <tabs tab-position="top" v-model="active">
        <tab-pane label="应用列表">
            <build-list-view :list="APPLICATIONS" @tab-changed="handleActive"/>
        </tab-pane>
        <tab-pane label="脚本列表">
            <build-detail-view/>
        </tab-pane>
        <tab-pane label="构建队列">
            <build-queue-view :list="APPLICATIONS" :queue="queue"/>
        </tab-pane>
        <tab-pane label="构建详情">
            <build-detail-view/>
        </tab-pane>
        <tab-pane label="全局设置">
            <build-detail-view/>
        </tab-pane>
        <tab-pane label="使用帮助">
            <build-detail-view/>
        </tab-pane>
    </tabs>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { Col, Row, TabPane, Tabs } from 'element-ui';
    import BuildListView from './build-list';
    import BuildDetailView from './detail';
    import BuildQueueView from './queue';

    export default {
        components: {
            Row, Col, Tabs, TabPane, BuildListView, BuildQueueView, BuildDetailView
        },
        data() {
            return {
                queue: [],
                active: 0
            };
        },
        computed: {
            ...mapGetters(['APPLICATIONS'])
        },
        mounted() {
            console.log(this.APPLICATIONS);
        },
        methods: {
            handleActive(index) {
                this.active = `${index}`;
            }
        }
    };
</script>