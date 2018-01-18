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

        <h4>构建队列【预留】</h4>
        <transition-group name="list" tag="ul" class="build-list">
            <li v-for="(item, index) in buildQueue" :key="index">
                <p class="title" v-text="item.name"></p>
                <p class="desc" v-text="item.desc"></p>
                <p class="time">
                    <span>上次构建：2018-01-09 18:36:00</span>
                    <span style="margin-left: 20px;">上次发布：2018-01-09 18:42:00</span>
                </p>
                <div class="build-option">
                    <el-button type="danger" plain round size="mini" @click="removeCompiler">移出队列</el-button>
                </div>
            </li>
        </transition-group>
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