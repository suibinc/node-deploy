<template>
    <div class="container">
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
    import { Button as ElButton } from 'element-ui';
    import store from '../../library/fetch';

    export default {
        components: {
            ElButton
        },
        props: {
            list: Array
        },
        methods: {
            loadBuildList() {
                store.fetchGet('/build/list').then(data => {
                    return data;
                });
            },
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