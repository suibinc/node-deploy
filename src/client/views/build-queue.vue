<template>
    <div class="container">
        <el-table :data="TASK_QUEUE" border style="width: 100%">
            <table-column type="index"/>
            <table-column prop="name" label="脚本名称" width="200"/>
            <table-column prop="desc" label="脚本描述"/>
            <table-column prop="file" label="对应文件（相对路径）"/>
            <table-column fixed="right" label="操作" width="90">
                <template slot-scope="scope">
                    <el-button type="text" size="small">移出队列</el-button>
                </template>
            </table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import {
        Button as ElButton,
        Table as ElTable,
        TableColumn
    } from 'element-ui';

    export default {
        components: {
            ElButton, ElTable, TableColumn
        },
        props: {
            list: Array,
            queue: Array
        },
        computed: {
            ...mapGetters(['TASK_QUEUE']),
            buildQueue() {
                let _ = [];
                for (let i of this.queue) {
                    _.push(this.list[i]);
                }
                return _;
            }
        },
        methods: {}
    };
</script>

<style lang="less">
    .list-enter-active, .list-leave-active {
        transition: all .6s;
    }

    //, .list-leave-to
    .list-enter {
        opacity: 0;
        transform: translateX(100px);
    }
</style>