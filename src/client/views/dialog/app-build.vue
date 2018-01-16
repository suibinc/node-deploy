<template>
    <el-dialog :title="title" :visible.sync="visible" :lock-scroll="false" class="small">
        <el-form size="small" label-width="80px" style="padding: 0 30px;">
            <form-item label="GIT">
                <span>git@github.com:suibinc/node-deploy.git</span>
            </form-item>
            <form-item label="构建脚本">
                <el-select v-model="option.script" style="width: 90%;" placeholder="请选择脚本">
                    <el-option v-for="(item, index) in scriptList" :key="index" :label="item.name" :value="index"/>
                </el-select>
            </form-item>
            <form-item label="">
                <el-radio-group v-model="option.type" disabled>
                    <el-radio label="tag" value="0"/>
                    <el-radio label="branch" value="1"/>
                </el-radio-group>
            </form-item>
            <form-item label="">
                <el-select v-model="option.branch" style="width: 90%;" disabled placeholder="请选择分支">
                    <el-option label="等待完善" value="shanghai"/>
                    <el-option label="请不要慌" value="beijing"/>
                    <el-option label="请不要慌" value="beijing"/>
                </el-select>
            </form-item>
            <form-item>
                <el-button type="primary" @click="run">立刻构建</el-button>
            </form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { EXEC_SCRIPT } from '../../../library/utils/events';
    import {
        Dialog as ElDialog,
        Form as ElForm,
        FormItem,
        Select as ElSelect,
        Option as ElOption,
        RadioGroup as ElRadioGroup,
        Radio as ElRadio,
        Button as ElButton
    } from 'element-ui';

    export default {
        components: {
            ElDialog, ElForm, FormItem, ElSelect, ElOption, ElRadioGroup, ElRadio, ElButton
        },
        props: {
            app: Object
        },
        data() {
            return {
                visible: false,
                option: {
                    type: '1',
                    script: null,
                    branch: ''
                },
                title: '',
                selection: [],
                scriptList: []
            };
        },
        computed: {
            ...mapGetters(['PROJECT_LIST', 'USER_SCRIPT'])
        },
        watch: {
            app: function () {
                console.log('changed');
                this.scriptList = this.app.script || [];
            }
        },
        created() {
            this.$root.$on('TRIGGER-APP-BUILD', show => {
                this.visible = show;
            });
        },
        methods: {
            show() {
                this.visible = true;
                this.$nextTick(this.updateSelection);
            },
            run() {
                if (this.option.script !== null) {
                    this.$root.$emit('send', EXEC_SCRIPT, {
                        uuid: this.app.uuid,
                        script: this.option.script
                    });
                    return false;
                }
                this.$message.warning('请选择构建脚本');
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