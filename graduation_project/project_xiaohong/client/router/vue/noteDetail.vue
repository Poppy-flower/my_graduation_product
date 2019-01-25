<template>
    <div>
        <commit @close="close" v-if="commitFlag" :id="commitNoteId"></commit>
        <topHeader :title="state == 1?'游记详情':'游记管理页面'"></topHeader>
        <span class="glyphicon glyphicon-pencil" @click="handleEdit"></span>
        <!--{{noteDetail}}-->
        <div class="main-content">
            <div class="top-main-content">
                <div class="note">
                    <div class="item-title">
                        <img src="../imgs/user.jpeg" alt="">
                        <div class="item-user-content">
                            <p class="note-user">小红</p>
                            <p class="time" v-text="noteDetail.createTime"></p>
                        </div>
                    </div>
                    <div v-if="state == 1" class="content" v-text="noteDetail.text"></div>
                    <textarea v-if="state == 2" class="note_text" v-model="text" name="" id="" cols="30" rows="10"></textarea>
                    <div class="imgs">
                        <template v-if="state == 1">
                            <img :src="noteDetail.img1" alt="">
                            <img :src="noteDetail.img2" alt="">
                        </template>
                        <template v-if="state == 2">
                            <upload :img="img1" @showNewValue="showNewValue"></upload>
                            <upload :img="img2" @showNewValue="showNewValue2"></upload>
                        </template>
                    </div>
                    <div class="handle-icons">
                        <div class="tab-item"  >
                            <span class="glyphicon glyphicon-eye-open"></span>
                            {{parseInt(Math.random()*100)}}
                        </div>
                        <div class="tab-item" @click="showCommit(noteDetail.id)">
                            <span class="glyphicon glyphicon-comment"></span>
                            {{parseInt(Math.random()*100)}}
                        </div>
                        <div class="tab-item"  >
                            <span class="glyphicon glyphicon-thumbs-up"></span>
                            {{parseInt(Math.random()*100)}}
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;margin-bottom:0.2rem;text-align: center">
                <div class="save_btn" @click="save">
                    <el-button type="success">保存</el-button>
                </div>
            </div>
            <div class="comment-title" v-if="state == 1">
                热评论
            </div>
            <div class="next-main-content" v-if="state == 1">
                <div class="commit-item" v-for="(item,index) in commitList">
                    <div class="item-title">
                        <img :src="item.img" alt="">
                        <div class="item-user-content">
                            <p class="commit-user" v-text="item.name"></p>
                            <p class="time" v-text="item.createTime"></p>
                        </div>
                    </div>
                    <div class="commit-content" v-text="item.text"></div>
                </div>
            </div>
        </div>
        <tabs select='note'></tabs>
    </div>
</template>
<script>
    import topHeader from "./components/header.vue";
    import tabs from "./components/tabs.vue";
    import commit from "./components/commit.vue";
    import util from "../util/utils.js"
    import upload from "./upload.vue";
    import axios from "axios";
    export default {
        components: {
            topHeader: topHeader,
            tabs: tabs,
            commit: commit,
            upload :upload
        },
        computed: {
            noteDetail(){
                this.img1=this.$store.state.noteDetail.img1;
                this.img2=this.$store.state.noteDetail.img2;
                this.text=this.$store.state.noteDetail.text;
                this.id=this.$store.state.noteDetail.id;
                return this.$store.state.noteDetail;
            },
            commitList(){
                return this.$store.state.commitList;
            }
        },
        data(){
            return {
                commitFlag: false,
                commitNoteId: 0,
                state:0,

                img1:'',
                img2:'',
                text:"",
                id:0
            }
        },
        mounted(){
            this.$store.commit({
                type: 'getNoteDetailById',
                id: this.$route.params.id
            });
            this.$store.dispatch({
                type: 'getCommitListByNoteId',
                id: this.$route.params.id
            });
            this.state=util.utils.getDataFromCookies("state");
        },
        methods: {
            save(){
                var obj={
                    "id":this.id,
                    "img1":this.img1,
                    "img2":this.img2,
                    "text":this.text
                }
                axios.post("/saveNoteInfo",obj).then(res=>{
                    if(res.data == "success"){
                        alert("保存成功");
                    }else{
                        alert("保存失败");
                    }
                })
            },
            showNewValue(value){
                this.img1=value;
            },
            showNewValue2(value){
                this.img2=value;
            },
            handleEdit() {
                this.$router.push('/noteEdit');
            },
            close(value){
                this.commitFlag = value;
            },
            showCommit(id){
                this.commitFlag = true;
                this.commitNoteId = id;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .glyphicon-pencil{
        position:fixed;
        top:0;
        right:0;
        color:#fff;
        z-index:1000;
        display:inline-block;
        width:0.5rem;
        height:0.6rem;
        line-height:0.6rem;
        text-align:center;
    }
    .main-content{
        margin-top:0.6rem;
        margin-bottom: 0.52rem;
    }
    .top-main-content,.next-main-content{
        width:100%;
        margin-bottom:0.2rem;
        .item-title{
            padding: 0.1rem 0.2rem 0 0.2rem;
            display:flex;
            width:100%;
            img{
                width:0.6rem;
                height:0.6rem;
                border-radius: 50%;
            }
            .item-user-content{
                padding-left: 0.2rem;
                width:100%;
            }
        }
        .content{
            padding:0.1rem 0.2rem;
        }
        .imgs{
            padding:0 0.2rem;
            width:3.75rem;
            position:relative;
            overflow:hidden;
            img{
                display: inline-block;
                width:1.4rem;
                height:1.4rem;
                margin-right:0.2rem;
                float:left;
            }
        }
        .handle-icons{
            margin-top:0.1rem;
            width: 100%;
            .tab-item{
                display: inline-block;
                width: 30%;
                font-size: 0.16rem;
                vertical-align: middle;
                text-align: center;
                line-height: 0.26rem;
                .glyphicon{
                    margin-right:0.1rem;
                }
            }
        }
        .commit-item{
            .commit-content{
                margin: 0 0.2rem 0 0.2rem;
                padding:0.1rem 0.05rem;
                border-bottom: 1px solid #e2e2e2;
            }
        }
    }
    .next-main-content{
        margin-bottom:0.7rem;
    }
    .comment-title{
        color: rgba(80,80,80,1);
        background-color: rgba(226,226,226,1);
        height:0.35rem;
        line-height:0.35rem;
        padding-left:0.2rem;
    }
    .note_text{
        width: 3.75rem;
        padding: 0.1rem;

    }
</style>