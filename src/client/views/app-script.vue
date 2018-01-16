<template>
    <el-dialog :title="title" :visible.sync="visible" @close="save" :lock-scroll="false">
        <el-table ref="table" :data="USER_SCRIPT.list" border style="width: 100%"
                  @selection-change="selectionChanged">
            <table-column type="selection" width="55"/>
            <table-column type="index"/>
            <table-column prop="name" label="脚本名称" width="200"/>
            <table-column prop="desc" label="脚本描述"/>
        </el-table>
    </el-dialog>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { SAVE_APP_SCRIPT } from '../../library/utils/events';
    import {
        Dialog as ElDialog,
        Table as ElTable,
        TableColumn
    } from 'element-ui';

    export default {
        components: {
            ElDialog, ElTable, TableColumn
        },
        props: {
            app: Object,
            tag: Number
        },
        data() {
            return {
                visible: false,
                title: '关联脚本',
                selection: []
            };
        },
        computed: {
            ...mapGetters(['PROJECT_LIST', 'USER_SCRIPT'])
        },
        watch: {
            'tag': 'show'
        },
        methods: {
            show() {
                this.visible = true;
                this.$nextTick(this.updateSelection);
            },
            save() {
                if (JSON.stringify(this.selection) !== JSON.stringify(this.app.script)) {
                    this.$root.$emit('send', SAVE_APP_SCRIPT, {
                        uuid: this.app.uuid,
                        list: this.selection
                    });
                }
            },
            selectionChanged(selection) {
                this.selection = selection;
            },
            updateSelection() {
                if (!this.$refs.table) return false;
                this.$refs.table.clearSelection();
                let list = this.USER_SCRIPT.list;
                this.app.script.forEach(item => {
                    let index = list.findIndex(i => i.name === item.name && i.file === item.file);
                    if (index >= 0) {
                        this.$refs.table.toggleRowSelection(list[index]);
                    }
                });
            }
        }
    };
</script>