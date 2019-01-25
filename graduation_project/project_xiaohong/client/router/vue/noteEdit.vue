<template>
    <div>
        <topHeader title="添加游记"></topHeader>
        <span class="glyphicon glyphicon-floppy-saved" @click="saveNote"></span>
        <div class="main-content">
            <div class="note-title-box">
                <label for="note-title">游记标题</label>
                <input id="note-title" type="text" placeholder="请输入游记标题" v-model="title">
            </div>
            <div class="text">
                <textarea class="content-textarea" name="" id="" cols="30" rows="10" placeholder="请输入内容" v-model="text"></textarea>
            </div>
            <div class="imgs">

            </div>
            <div class="select-type">
                <p class="title">选择游记类型</p>
                <ul class="select-box">
                    <li :class="{'selected': select == 1}" @click="changeType(1)">
                        <span class="glyphicon glyphicon-check"></span>
                        风景
                    </li>
                    <li :class="{'selected': select == 2}" @click="changeType(2)">
                        <span class="glyphicon glyphicon-check"></span>
                        美食
                    </li>
                    <li :class="{'selected': select == 3}" @click="changeType(3)">
                        <span class="glyphicon glyphicon-check"></span>
                        逛街
                    </li>
                    <li :class="{'selected': select == 4}" @click="changeType(4)">
                        <span class="glyphicon glyphicon-check"></span>
                        人物
                    </li>
                    <li :class="{'selected': select == 5}" @click="changeType(5)">
                        <span class="glyphicon glyphicon-check"></span>
                        人文
                    </li>
                    <li :class="{'selected': select == 6}" @click="changeType(6)">
                        <span class="glyphicon glyphicon-check"></span>
                        历史
                    </li>
                </ul>
            </div>
        </div>
        <tabs select='note'></tabs>
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
        mounted(){

        },
        data(){
            return {
                select : 1,
                title: '',
                text: ''
            }
        },
        methods: {
            changeType(type){
                this.select=type;
            },
            saveNote(){
                this.$store.dispatch({
                    type: 'saveNote',
                    params: {
                        noteInfo: {
                            title: this.title,
                            text: this.text,
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .glyphicon-floppy-saved{
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
        .note-title-box{
            height:0.5rem;
            line-height: 0.5rem;
            display:flex;
            border-bottom:1px solid #e2e2e2;
            label{
                width:1rem;
                padding-left:0.1rem;
            }
            input{
                display:inline-block;
                width:100%;
                text-align:right;
                padding-right:0.3rem;
            }
        }
        .text{
            padding:0.1rem 0.2rem 0.1rem 0.2rem;
            .content-textarea{
                width:100%;
                border: 1px solid #e2e2e2;
            }
        }
        .select-type{
            .title{
                height:0.5rem;
                line-height: 0.5rem;
                background-color: rgba(248,248,248,1);
                padding-left:0.2rem;
            }
            .select-box{
                position:relative;
                overflow:hidden;
                li{
                    display:inline-block;
                    float:left;
                    width:0.8rem;
                    height:0.8rem;
                    margin-right:0.15rem;
                    margin-bottom:0.15rem;
                    text-align:center;
                    border:1px solid #e2e2e2;
                    .glyphicon{
                        display:inline-block;
                        width:100%;
                        margin-top:0.2rem;
                    }
                }
                .selected{
                    color: #fff;
                    background-color: #ff6e6e;
                }
            }
        }
    }
</style>