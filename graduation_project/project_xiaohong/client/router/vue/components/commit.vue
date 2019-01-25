<template>
    <div>
        <div class="mask" @click="close"></div>
        <div class="center">
            <div class="title">请填写评论</div>
            <textarea v-model="text" class="area" name="" id="" cols="30" rows="10"></textarea>
            <div class="btn-commit" @click="submit">
                <span>评论</span>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        props:["id"],
        data(){
            return {
                text:""
            }
        },
        methods:{
            close(){
                this.$emit("close",false);
            },
            submit(){
                var _this=this;
                var obj={
                    "text":this.text,
                    "noteId":this.noteId
                };
                axios.post("/addCommon",obj).then( res => {
                    if(res.data == "success"){
                        _this.close();
                        alert("评价成功");
                        window.location.reload();
                    }else{
                        alert("评价失败");
                    }
                } )
            }
        },
        computed:{
            noteId(){
                return this.id;
            }
        }
    }
</script>
<style scoped lang="scss">
    .mask{
        background: #000000;
        opacity: 0.7;
        position: fixed;
        z-index:1002;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .center{
        width: 3rem;
        height: 2.4rem;
        position: fixed;
        z-index: 1003;
        background: white;
        top: 2.2rem;
        border-radius: 5px;
        left: 0.375rem;
        padding: 0.1rem;
        .title{
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.2rem;
            text-align: center;
            margin-bottom: 0.2rem;
        }
        .area{
            width: 100%;
            height:1rem;
            border: 1px solid black;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 0.1rem;
            margin-bottom: 0.1rem;
        }
        .btn-commit{
            text-align:center;
            span{
                padding:0 0.1rem;
                display:inline-block;
                height:0.3rem;
                line-height:0.3rem;
                background-color:#e2e2e2;
                color:#fff;
            }
        }
    }
</style>