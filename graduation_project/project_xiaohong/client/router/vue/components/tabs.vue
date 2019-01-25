<template>
    <div>
        <div class="footer">
            <div v-if="state == 1" class="tab-item" :class="{'selected': select == 'home'}" @click="handleChangeTab(1)">
                <span class="glyphicon glyphicon-home"></span>
                首页
            </div>
            <div class="tab-item" :class="{'selected': select == 'scene'}" @click="handleChangeTab(2)">
                <span class="glyphicon glyphicon-globe"></span>
                <span v-if="state == 2">管理</span>景点
            </div>
            <div class="tab-item" :class="{'selected': select == 'note'}" @click="handleChangeTab(3)">
                <span class="glyphicon glyphicon-list"></span>
                <span v-if="state == 2">管理</span>游记
            </div>
            <div class="tab-item" :class="{'selected': select == 'mine'}" @click="handleChangeTab(4)">
                <span class="glyphicon glyphicon-user"></span>
                我的
            </div>
        </div>
    </div>
</template>
<script>
    import util from "../../util/utils.js"
    export default {
        props: {
            select: {
                default: 'mine',
                require: true
            }
        },
        data(){
          return {
              state:0
          }
        },
        mounted(){
            if(util.utils.getDataFromCookies("userId")){
                this.state=util.utils.getDataFromCookies("state");
            }else{
                this.$router.push("/mine");
            }
        },
        methods:{
            handleChangeTab(index){
                if(index == 1){
                    this.$router.push("/");
                }else if(index == 2){
                    this.$router.push("/sceneList");
                }else if(index == 3){
                    this.$router.push("/note");
                }else if(index == 4){
                    this.$router.push("/mine");
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .footer{
        position: fixed;
        bottom: 0;
        font-size: 0;
        width: 100%;
        background-color: rgba(248,248,248,1);
        .tab-item{
            display: inline-block;
            width: 25%;
            font-size: 0.14rem;
            vertical-align: middle;
            text-align: center;
            line-height: 0.26rem;
            .glyphicon{
                display: inline-block;
                width:100%;
            }
        }
        .selected{
            color: #fff;
            background-color: #ff6e6e;
        }
    }
</style>