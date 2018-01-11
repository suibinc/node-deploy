<template>
    <div class="container">
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
    import store from '../../library/fetch';
    import { Button as ElButton } from 'element-ui';

    export default {
        components: {
            ElButton
        },
        props: {
            list: Array,
            queue: Array
        },
        computed: {
            buildQueue() {
                let _ = [];
                for (let i of this.queue) {
                    _.push(this.list[i]);
                }
                return _;
            }
        },
        methods: {
            removeCompiler(item, index) {
                store.fetchGet(`/remove/${index}`).then(data => {
                    console.log(data);
                });
            }
        }
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