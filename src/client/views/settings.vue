<template>
    <div class="container">
        <el-form>
            <form-item label="工程导入" style="margin-bottom: 0;">
                <el-button type="primary" plain size="small" style="float: right;">导入下列已选中应用</el-button>
            </form-item>
            <el-table :data="USER_CONFIG.list" border style="width: 100%" @selection-change="selectionChanged">
                <table-column type="selection" width="55"/>
                <table-column type="index"/>
                <table-column prop="name" label="工程名称" width="200"/>
                <table-column prop="desc" label="工程描述"/>
                <table-column fixed="right" label="操作" width="90">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">导入应用</el-button>
                    </template>
                </table-column>
            </el-table>
        </el-form>

        <!--<el-dialog :visible.sync="scriptShow">-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import {
        Button as ElButton, Dialog as ElDialog, Form as ElForm, FormItem, Table as ElTable,
        TableColumn
    } from 'element-ui';
    import { mapGetters } from 'vuex';

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
                console.log('sc', arguments);
                this.selection = selection;
            },
            addProject() {
                this.$emit();
            }
        }
    };
</script>