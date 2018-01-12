<template>
    <div class="container">
        <el-table :data="list" border style="width: 100%">
            <table-column prop="name" label="状态" width="50">
                <template slot-scope="scope" style="text-align: center;">
                    <div class="building-state">
                        <i :class="loadStatus(scope.row)"></i>
                    </div>
                </template>
            </table-column>
            <table-column prop="name" label="应用名称" width="200"/>
            <table-column prop="desc" label="应用描述"/>
            <table-column prop="time" label="上次构建" width="140">
                <template slot-scope="scope">
                    <div class="building-timer">
                        <span>2018-01-12 00:00:00</span>
                    </div>
                </template>
            </table-column>
            <table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">构建</el-button>
                    <dropdown style="margin-left: 10px;">
                        <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <dropdown-menu slot="dropdown" style="text-align: center">
                            <dropdown-item>关联脚本</dropdown-item>
                            <dropdown-item>构建历史</dropdown-item>
                            <dropdown-item divided>修改</dropdown-item>
                            <dropdown-item class="status-primary">复制</dropdown-item>
                            <dropdown-item class="status-danger">删除</dropdown-item>
                        </dropdown-menu>
                    </dropdown>
                </template>
            </table-column>
        </el-table>
    </div>
</template>

<script>
    import State from '../../library/utils/State';
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
            loadStatus(row) {
                console.log(row);
                if (row.status === State.NORMAL) {
                    return 'el-icon-success';
                }
                if (row.status === State.QUEUE) {
                    return 'el-icon-time';
                }
                if (row.status === State.BUILDING) {
                    return 'el-icon-loading';
                }
                return 'el-icon-error';
            },
            timeFormatter(row) {
                if (!row.time) return '2018-01-12 00:00:00';
                return row.time;
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
        .building-state {
            color: #00ff00;
            text-align: center;
        }
        .building-timer {
            color: #8c939d;
            font-size: 12px;
        }
    }
</style>