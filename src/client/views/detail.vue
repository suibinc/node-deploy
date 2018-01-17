<template>
    <div class="container">
        <el-card style="width: 200px;float: left;">
            <div slot="header" class="clearfix">
                <span>构建历史</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <el-card style="width: 780px;float: left;margin-left: 15px;">
            <div slot="header" class="clearfix">
                <span>构建输出</span>
            </div>
            <div class="text">
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出构建输出构建输出构建输出构建输出构建输出构建输出构建输出 <br>
                构建输出
            </div>
        </el-card>
    </div>
</template>

<script>
    import { Card as ElCard } from 'element-ui';

    export default {
        components: {
            ElCard
        },
        created() {
            this.$root.$on('build-repo', uuid => {
                console.log(uuid);
            });
        }
    };
</script>

<style lang="less">

</style>