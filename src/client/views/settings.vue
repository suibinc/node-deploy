<template>
    <div class="container">
        <el-form>
            <form-item label="导入已配置的应用列表" style="margin-bottom: 0;">
                <el-button type="primary" plain size="small" @click="addAll" style="float: right;">
                    导入下列已选中应用
                </el-button>
            </form-item>
            <el-table :data="USER_CONFIG.list" border style="width: 100%" @selection-change="selectionChanged">
                <table-column type="selection" width="55"/>
                <table-column type="index"/>
                <table-column prop="name" label="工程名称" width="200"/>
                <table-column prop="desc" label="工程描述"/>
                <table-column fixed="right" label="操作" width="90">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addPro(scope.row)">导入应用</el-button>
                    </template>
                </table-column>
            </el-table>
        </el-form>

        <!--<el-dialog :visible.sync="scriptShow">-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { ADD_PROJECT_LIST } from '../../library/utils/events';
    import {
        Button as ElButton,
        Form as ElForm,
        Table as ElTable,
        Dialog as ElDialog,
        FormItem,
        TableColumn
    } from 'element-ui';

    export default {
        components: {
            ElButton, ElForm, FormItem, ElDialog, ElTable, TableColumn
        },
        data() {
            return {
                scriptShow: false,
                selection: []
            };
        },
        computed: {
            ...mapGetters(['USER_CONFIG'])
        },
        methods: {
            selectionChanged(selection) {
                this.selection = selection;
            },
            addPro(item) {
                this.$emit('send', ADD_PROJECT_LIST, [item]);
            },
            addAll() {
                if (this.selection.length < 1) {
                    this.$message.error('未选择任何应用');
                    return false;
                }
                this.$emit('send', ADD_PROJECT_LIST, this.selection);
            }
        }
    };
</script>