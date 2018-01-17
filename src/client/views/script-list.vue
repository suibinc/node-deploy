<template>
    <div class="container">
        <el-alert :title="warnText" type="error" style="margin-bottom: 10px;"/>
        <el-table :data="list" border style="width: 100%">
            <table-column type="index"/>
            <table-column prop="name" label="脚本名称" width="200"/>
            <table-column prop="desc" label="脚本描述"/>
            <table-column prop="file" label="对应文件（相对路径）"/>
            <table-column fixed="right" label="操作" width="90">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看脚本</el-button>
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
        TableColumn,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Alert as ElAlert
    } from 'element-ui';

    export default {
        components: {
            ElButton, ElTable, TableColumn, Dropdown, DropdownMenu, DropdownItem, ElAlert
        },
        computed: {
            ...mapGetters(['PROJECT_LIST', 'USER_SCRIPT']),
            list() {
                return this.USER_SCRIPT.list || [];
            }
        },
        data() {
            return {
                warnText: '脚本执行可能涉及服务器安全，故不支持在此处修改脚本文件，如需修改请手动编辑配置目录下的相关文件'
            };
        },
        methods: {}
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