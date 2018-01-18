<template>
    <div class="container build-info-wrap">
        <el-card style="width: 200px;float: left;">
            <div slot="header">
                <span>构建历史</span>
            </div>
            <div class="build-info" v-if="buildInfoList.length === 0">暂无构建历史</div>
            <ul class="build-histories">
                <li v-for="(item, index) in buildInfoList" :key="index" class="build-item"
                    :class="{'active': active === index}" @click="handleClick(index)">
                    <span style="margin-right: 10px;">#{{index+1}}</span><span>构建用户：{{item.user}}</span> <br>
                    <span>时间：{{formatDate(item.start)}}</span>
                </li>
            </ul>
        </el-card>
        <el-card style="width: 780px;float: left;margin-left: 15px;">
            <div slot="header">
                <span>构建输出</span>
            </div>
            <div class="build-info" v-html="buildInfoHtml"></div>
        </el-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { GET_HISTORY_LIST, GET_BUILD_INFO } from '../../library/utils/events';
    import { UPDATE_BUILD_INFO } from '../vuex/actions';
    import { Card as ElCard } from 'element-ui';

    export default {
        components: {
            ElCard
        },
        data() {
            return {
                uuid: '',
                active: 0
            };
        },
        computed: {
            ...mapGetters(['HISTORIES', 'BUILD_INFO']),
            buildInfoHtml() {
                if (this.BUILD_INFO) {
                    return this.BUILD_INFO.replace(/\n/g, '<br>');
                }
                return '暂无构建输出';
            },
            buildInfoList() {
                return this.HISTORIES.reverse();
            }
        },
        created() {
            this.$root.$on('build-info-changed', uuid => {
                this.uuid = uuid;
                this.clearBuildInfo();
                this.getHistories();
            });
        },
        methods: {
            clearBuildInfo() {
                this.$store.dispatch({
                    type: UPDATE_BUILD_INFO,
                    info: ''
                });
            },
            formatNum(num) {
                return num < 10 ? '0' + num : num;
            },
            formatDate(time) {
                if (time && time > 10E10) {
                    let date = new Date(time);
                    let yy = date.getFullYear();
                    let mo = this.formatNum(date.getMonth() + 1);
                    let dd = this.formatNum(date.getDate());
                    let hh = this.formatNum(date.getHours());
                    let mm = this.formatNum(date.getMinutes());
                    let ss = this.formatNum(date.getSeconds());

                    return `${yy}-${mo}-${dd} ${hh}:${mm}:${ss}`;
                }
                return '1970-01-01 00:00:00';
            },
            getHistories() {
                if (!this.uuid) return false;
                this.$root.$emit('send', GET_HISTORY_LIST, {
                    uuid: this.uuid
                });
                setTimeout(() => {
                    this.getBuildInfo();
                }, 1000);
            },
            getBuildInfo() {
                let item = this.HISTORIES[this.active];
                if (!item) return false;
                this.$root.$emit('send', GET_BUILD_INFO, {
                    uuid: item.uuid
                });
            },
            handleClick(index) {
                this.active = index;
                this.getBuildInfo();
            }
        }
    };
</script>

<style lang="less">
    .build-info-wrap {
        .build-histories {
            list-style: none;
            min-height: 800px;
            margin-top: -10px;
            .build-item {
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
                cursor: pointer;
                &:last-child {
                    border-bottom: none;
                }
                &.active,
                &:hover {
                    span {
                        color: #3a8ee6;
                    }
                }
            }
            span {
                font-size: 12px;
                color: #666;
            }
        }
        .build-info {
            font-size: 12px;
            color: #666;
            min-height: 800px;
        }
    }
</style>