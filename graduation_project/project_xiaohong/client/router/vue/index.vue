<template>
    <div>
        <topHeader :back=false title="爱旅游"></topHeader>
        <div class="main-content">
            <div class="search">
                <div class="search-box">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    <input
                            class="search-content"
                            type="text"
                            placeholder="搜索目的地"
                    >
                </div>
            </div>
            <div class="scene-carouel">
                <div class="title">
                    <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                    热门目的地
                </div>
                <div class="scene-swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img class="img-item" src="../imgs/泰国曼谷-芭提雅-普吉岛.jpg" alt="">
                            <p>
                                <span class="glyphicon glyphicon-map-marker"></span>
                                泰国
                            </p>
                            <div class="msg">
                                泰国曼谷-芭提雅-普吉岛
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <img class="img-item" src="../imgs/迪拜-阿布扎比.jpg" alt="">
                            <p>
                                <span class="glyphicon glyphicon-map-marker"></span>
                                迪拜
                            </p>
                            <div class="msg">
                                迪拜-阿布扎比自由行
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <img class="img-item" src="../imgs/马尔代夫CentaraGrand 自由行.jpg" alt="">
                            <p>
                                <span class="glyphicon glyphicon-map-marker"></span>
                                马尔代夫
                            </p>
                            <div class="msg">
                                马尔代夫CentaraGrand
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="note">
                <div class="title">
                    <span class="glyphicon glyphicon-link"></span>
                    热门游记
                </div>
                <div class="note-item" v-for="(item,index) in noteList" @click="gotoNoteDetail(item.id)">
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
        <tabs select='home'></tabs>
    </div>
</template>
<script>
    import topHeader from "./components/header.vue";
    import tabs from "./components/tabs.vue";
    export default {
        components: {
            topHeader: topHeader,
            tabs: tabs
        },
        computed: {
            noteList(){
                return this.$store.state.noteList;
            }
        },
        mounted(){
            var sceneSwiper = new Swiper('.scene-swiper-container', {
                autoplay: true,//可选选项，自动滑动
                speed:2300,
            });
            this.$store.dispatch({
                type: 'getIndexNoteList'
            }).then(function(value){

            })
        },
        methods: {
            gotoNoteDetail(id) {
                this.$router.push(`/noteDetail/${id}`);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../public/javascripts/swiper-4.2.2.min.css";
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
        .carouel{
            .swiper-container{
                .img-item{
                    width:100%;
                    height:2rem;
                }
            }
        }
        .scene-carouel{
            .title{
                text-align: center;
                line-height:0.4rem;
            }
            .scene-swiper-container{
                overflow: hidden;
                .swiper-wrapper{
                    .swiper-slide{
                        height: 1.5rem;
                        color:#fff;
                        .img-item{
                            width:100%;
                            height:1.5rem;
                        }
                        p{
                            margin-top: -0.3rem;
                            padding-right:0.1rem;
                            text-align: right;
                        }
                        div{
                            margin-top: -0.3rem;
                            padding-left: 0.1rem;
                            text-align: left;
                        }
                    }
                }
            }
        }
        .note{
            .title{
                padding-left: 0.2rem;
                text-align: left;
                line-height:0.4rem;
                border-bottom: 1px solid rgba(217,217,217,1);
            }
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