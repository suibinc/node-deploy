<template>
    <div class="container">
        <el-table :data="PROJECT_LIST" border style="width: 100%">
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
                        <span>{{ timeFormatter(scope.row) }}</span>
                    </div>
                </template>
            </table-column>
            <table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="viewPro(scope.row)">查看</el-button>
                    <el-button type="text" size="small" @click="buildPro(scope.row)">构建</el-button>
                    <dropdown style="margin-left: 10px;" @command="handleCommand">
                        <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <dropdown-menu slot="dropdown" style="text-align: center">
                            <dropdown-item :command="{type:'link', data:scope.row}">关联脚本</dropdown-item>
                            <dropdown-item :command="{type:'data', data:scope.row}">局部变量</dropdown-item>
                            <dropdown-item>构建历史</dropdown-item>
                            <dropdown-item divided>修改</dropdown-item>
                            <dropdown-item class="status-primary" :command="{type:'copy', data:scope.row}">
                                复制
                            </dropdown-item>
                            <dropdown-item class="status-danger" :command="{type:'delete', data:scope.row}">
                                删除
                            </dropdown-item>
                        </dropdown-menu>
                    </dropdown>
                </template>
            </table-column>
        </el-table>
        <app-scripts :tag="show" :app="app"/>
        <app-build-dialog :app="app"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { DEL_PROJECT_LIST } from '../../library/utils/events';
    import State from '../../library/utils/State';
    import AppScripts from './dialog/app-script.vue';
    import AppBuildDialog from './dialog/app-build';
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
            AppScripts, ElButton, ElTable, TableColumn, Dropdown, DropdownMenu, DropdownItem, AppBuildDialog
        },
        data() {
            return {
                show: 1,
                app: {}
            };
        },
        computed: {
            ...mapGetters(['PROJECT_LIST'])
        },
        methods: {
            loadStatus(row) {
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
            formatNum(num) {
                return num < 10 ? '0' + num : num;
            },
            timeFormatter(row) {
                if (row.latest && row.latest.time) {
                    let date = new Date(row.latest.time);
                    let yy = date.getFullYear();
                    let mo = this.formatNum(date.getMonth() + 1);
                    let dd = this.formatNum(date.getDate());
                    let hh = this.formatNum(date.getHours());
                    let mm = this.formatNum(date.getMinutes());
                    let ss = this.formatNum(date.getSeconds());

                    return `${yy}-${mo}-${dd} ${hh}:${mm}:${ss}`;
                }
                if (!row.latest.time) return '1970-01-01 00:00:00';
            },
            handleCommand(option) {
                if (!option.type) return false;
                if (option.type === 'link') {
                    this.linkPro(option.data);
                    return true;
                }
                if (option.type === 'delete') {
                    this.delPro(option.data);
                    return true;
                }
            },
            buildPro(item) {
                this.app = item;
                this.$root.$emit('TRIGGER-APP-BUILD', true);
            },
            linkPro(item) {
                item.script = item.script || [];
                this.app = item;
                this.show++;
            },
            viewPro(item) {
                this.$root.$emit('get-histories', item.uuid);
                this.$root.$emit('tab-changed', 3);
            },
            delPro(item) {
                this.$confirm('是否删除该应用并清除相关构建历史?', '删除确认', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.$emit('send', DEL_PROJECT_LIST, item);
                }, () => {
                });
            }
        }
    };
</script>

<style lang="less">
    .container {
        .el-dialog__body {
            padding: 0 15px 20px;
        }
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