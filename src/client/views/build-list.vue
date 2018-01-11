<template>
    <div class="container">
        <el-table :data="list" border style="width: 100%">
            <table-column prop="name" label="应用名称" width="200"/>
            <table-column prop="desc" label="应用描述"/>
            <table-column prop="time" label="上次构建时间" width="110"/>
            <table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">构建</el-button>
                    <dropdown style="margin-left: 10px;">
                        <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <dropdown-menu slot="dropdown" style="text-align: center">
                            <dropdown-item>构建脚本</dropdown-item>
                            <dropdown-item>发布脚本</dropdown-item>
                            <dropdown-item>构建历史</dropdown-item>
                            <dropdown-item divided>修改</dropdown-item>
                            <dropdown-item style="color: #409EFF;">复制</dropdown-item>
                            <dropdown-item style="color: #F56C6C;">删除</dropdown-item>
                        </dropdown-menu>
                    </dropdown>
                </template>
            </table-column>
        </el-table>
        <h4>工程列表</h4>
        <ul class="build-list">
            <li v-for="(item, index) in list">
                <p class="title" v-text="item.name"></p>
                <p class="desc" v-text="item.desc"></p>
                <p class="time">
                    <span>上次构建：2018-01-09 18:36:00</span>
                    <span style="margin-left: 20px;">上次发布：2018-01-09 18:42:00</span>
                </p>
                <div class="build-option">
                    <el-button type="primary" plain round size="mini">查看构建脚本</el-button>
                    <el-button type="primary" plain round size="mini">查看发布脚本</el-button>
                    <el-button type="primary" plain round size="mini">构建历史</el-button>
                    <el-button type="warning" plain round size="mini" @click="execCompiler(item, index)">开始构建
                    </el-button>
                    <el-button type="warning" plain round size="mini">执行发布</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import store from '../../library/fetch';
    import {
        Button as ElButton,
        Table as ElTable,
        TableColumn,
        Dropdown,
        DropdownMenu,
        DropdownItem
    } from 'element-ui';

    export default {
        components: {
            ElButton, ElTable, TableColumn, Dropdown, DropdownMenu, DropdownItem
        },
        props: {
            list: Array
        },
        methods: {
            execCompiler(item, index) {
                store.fetchGet(`/compiler/${index}`).then(data => {
                    this.$emit('tab-changed', 1);
                });
            }
        }
    };
</script>

<style lang="less">
    .container {
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        ul {
            list-style: none;
            li {
                padding: 20px;
                border: 1px solid #d3d4d6;
                border-radius: 6px;
                background: #fff;
                margin-top: 20px;
            }
        }
        .build-list {
            p {
                padding-bottom: 4px;
            }
            .title {
                font-size: 20px;
                color: #333;
            }
            .desc {
                font-size: 12px;
                color: #8c939d;
            }
            .time {
                font-size: 12px;
                color: #666;
            }
            .build-option {
                margin-top: 12px;
            }
        }
    }
</style>