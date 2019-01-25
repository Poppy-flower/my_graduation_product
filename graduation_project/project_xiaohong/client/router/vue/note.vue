<template>
    <div>
        <topHeader title="精选游记"></topHeader>
        <span class="glyphicon glyphicon-pencil" @click="handleEditNote"></span>
        <div class="main-content" :style="{'margin-top':state == 2 ? '0.6rem' : 'null'}">
            <div class="search" v-if="state == 1">
                <div class="search-box">
                    <span @click="search" class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    <input
                            class="search-content"
                            type="text"
                            placeholder="搜索游记"
                            v-model="searchKey"
                            @keyup.enter="search"
                    >
                </div>
            </div>
            <div class="note">
                <div class="note-item" v-for="(item,index) in allNoteList" @click="gotoNoteDetail(item.id)">
                    <div class="img-box">
                        <img :src="item.img1" alt="">
                    </div>
                    <div class="content-msg">
                        <p class="note-title" v-text="item.title"></p>
                        <p class="note-star">{{parseInt(Math.random()*10000+10000)}}人关注 | {{parseInt(Math.random()*40000+60000)}}人浏览</p>
                    </div>
                </div>
            </div>
        </div>
        <tabs select='note'></tabs>
    </div>
</template>
<script>
    import topHeader from "./components/header.vue";
    import tabs from "./components/tabs.vue";
    import util from "../util/utils.js"
    export default {
        components: {
            topHeader: topHeader,
            tabs: tabs
        },
        methods:{
            handleEditNote(){
                this.$router.push("/noteEdit");
            },
            gotoNoteDetail(id) {
                this.$router.push(`/noteDetail/${id}`);
            },
            search(){
                this.$store.dispatch({
                    type:"searchNote",
                    key : this.searchKey
                })
            }
        },
        data(){
          return {
              searchKey:'',
              state:0
          }
        },
        computed: {
            allNoteList(){
                return this.$store.state.allNoteList;
            }
        },
        mounted(){
            this.$store.dispatch({
                type: 'getAllNoteList'
            }).then(function(value){

            })
            this.state=util.utils.getDataFromCookies("state");
        },
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
        margin-top:1.2rem;
        margin-bottom:0.52rem;
        width:100%;
        .search{
            position: fixed;
            top:0.6rem;
            z-index:999;
            background-color: rgba(248,248,248,1);
            padding:0.1rem;
            width:100%;
            .search-box{
                background-color:rgba(142,142,142,0.12);
                -webkit-border-radius: 0.1rem;
                -moz-border-radius: 0.1rem;
                border-radius: 0.1rem;
                height:0.4rem;
                line-height:0.4rem;
                width:100%;
                overflow:hidden;
                display:flex;
                .glyphicon{
                    display:inline-block;
                    width:0.4rem;
                    height:0.4rem;
                    line-height:0.4rem;
                    text-align:center;
                }
                input{
                    display:inline-block;
                    width:100%;
                    height:0.4rem;
                    line-height:0.4rem;
                }
            }
        }
        .note{
            .note-item{
                padding: 0.11px;
                border-bottom:1px solid rgba(217,217,217,1);
                display: flex;
                vertical-align: middle;
                .img-box{
                    display:inline-block;
                    width:1.5rem;
                    height:1rem;
                    line-height: 1rem;
                    padding-left: 0.1rem;
                    img{
                        width:1.3rem;
                        height:0.8rem;
                        border-radius:0.1rem;
                    }
                }
                .content-msg{
                    width:100%;
                    display:inline-block;
                    padding-left:0.1rem;
                    .note-title{
                        border: 0;
                        line-height:0.3rem;
                    }
                    .note-star{
                        font-size: 0.12rem;
                        color: rgba(133,133,133,1);
                    }
                }
            }
        }
    }
</style>