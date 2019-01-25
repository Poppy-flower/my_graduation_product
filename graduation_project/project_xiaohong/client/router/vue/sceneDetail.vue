<template>
    <div>
        <topHeader :title="state == 1?'景点详情':'景点管理页面'"></topHeader>
        <div class="main-content" v-if="state == 1">
            <div class="title" v-text="sceneDetail.name"></div>
            <div class="scene-msg">
                <span>景点介绍：</span>{{sceneDetail.text}}
            </div>
            <div class="scene-msg">
                <span>历史信息：</span>{{sceneDetail.history}}
            </div>
            <div class="scene-msg">
                <span>交通推荐：</span>{{sceneDetail.bus}}
            </div>
            <div class="imgs">
                <img :src="sceneDetail.img1" alt="">
                <img :src="sceneDetail.img2" alt="">
            </div>
        </div>
        {{newImgSrc}}----{{newImgSrc2}}
        <div class="main-content" v-if="state == 2">
            <input class="title" v-model="sceneDetail.name" type="text">
            <div class="scene-msg">
                <span>景点介绍：</span><textarea class="admin_text" v-model="sceneDetail.text"></textarea>
            </div>
            <div class="scene-msg">
                <span>历史信息：</span><textarea class="admin_text" v-model="sceneDetail.history"></textarea>
            </div>
            <div class="scene-msg">
                <span>交通推荐：</span><textarea class="admin_text" v-model="sceneDetail.bus"></textarea>
            </div>
            <div class="imgs">
                <upload :img="newImgSrc" @showNewValue="showNewValue"></upload>
                <upload :img="newImgSrc2" @showNewValue="showNewValue2"></upload>
            </div>
            <div v-if="state == 2" style="width: 100%;text-align: center">
                <div class="save_btn" @click="save">
                    <el-button type="success">保存</el-button>
                </div>
            </div>
        </div>
        <tabs select='scene'></tabs>
    </div>
</template>
<script>
    import axios from "axios";
    import upload from "./upload.vue";
    import topHeader from "./components/header.vue";
    import tabs from "./components/tabs.vue";
    import util from "../util/utils.js"
    export default {
        components: {
            topHeader: topHeader,
            tabs: tabs,
            upload:upload
        },
        methods:{
            save(){
                var obj={
                    id:this.id,
                    name:this.name,
                    text:this.text,
                    history:this.history,
                    bus:this.bus,
                    img1:this.newImgSrc,
                    img2:this.newImgSrc2,
                }
                axios.post("/saveSceneInfo",obj).then(res=>{
                    if(res.data == "success"){
                        alert("保存成功");
                    }else{
                        alert("保存失败");
                    }
                })
            },
            showNewValue(value){
                this.newImgSrc=value;
            },
            showNewValue2(value){
                this.newImgSrc2=value;
            },
        },
        data(){
          return {
              state:0,

              id:0,
              name:'',
              text:"",
              history:"",
              bus:"",
              newImgSrc:'',
              newImgSrc2:''
          }
        },
        computed: {
            sceneDetail(){
                this.id=this.$store.state.sceneDetail.id;
                this.name=this.$store.state.sceneDetail.name;
                this.text=this.$store.state.sceneDetail.text;
                this.history=this.$store.state.sceneDetail.history;
                this.bus=this.$store.state.sceneDetail.bus;
                this.newImgSrc=this.$store.state.sceneDetail.img1;
                this.newImgSrc2=this.$store.state.sceneDetail.img2;
                return this.$store.state.sceneDetail;
            },
        },
        mounted(){
            this.$store.commit({
                type: 'getSceneDetailById',
                id: this.$route.params.id
            });
            this.state=util.utils.getDataFromCookies("state");
            console.log(this.state);
        }
    }
</script>
<style lang="scss" scoped>
    .main-content{
        margin-top:0.6rem;
        margin-bottom:0.52rem;
        width:100%;
        padding:0.1rem 0.2rem 0.2rem 0.2rem;
        .title{
            font-size:0.2rem;
            height:0.6rem;
            line-height:0.6rem;
        }
        .scene-msg{
            padding:0.1rem 0;
            line-height:0.26rem;
            span{
                color:#ff6e6e;
            }
        }
        .imgs{
            overflow:hidden;
            img{
                width:1.5rem;
                height:1.5rem;
                margin-right:0.15rem;
            }
        }
    }
    .main-content{
        .admin_text{
            border: 1px solid gray;
            height: 3rem;
            overflow: scroll;
            width: 100%;
            border-radius: 5px;
            box-sizing: border-box;
        }
    }
</style>