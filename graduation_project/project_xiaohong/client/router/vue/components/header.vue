<template>
    <div>
        <div class="header">
            <span v-if="back" class="glyphicon glyphicon-chevron-left" @click="gotoBack"></span>
            {{title}}
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                default: '爱旅游首页',
                require: true
            },
            back:{
                default: true,
                require:false
            }
        },
        methods: {
            gotoBack() {
                // 后退一步记录，等同于 history.back()
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    body{
        margin: 0;
        padding: 0;
    }
    .header{
        height: 0.60rem;
        line-height: 0.60rem;
        text-align: center;
        position: fixed;
        top:0;
        width:100%;
        color: #fff;
        background-color: #ff6e6e;
        border-bottom: 1px solid rgba(229,229,229,1);
        z-index: 999;
        .glyphicon-chevron-left {
            position: absolute;
            top: 50%;
            margin-top: -8px;
            left: 10px;
        }
    }
</style>