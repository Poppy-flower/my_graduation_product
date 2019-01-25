<template>
    <div class="login">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <div class="main-content">
            <div class="user-box">
                <img src="../imgs/user.jpeg" alt="">
            </div>
            <div class="info-box">
                <div>
                    <div class="info-item">
                        <label for="user-name">国家</label>
                        <input type="text" id="user-name" placeholder="中国" disabled>
                    </div>
                    <div class="info-item">
                        <label class="area-no" for="user-small-name">+86</label>
                        <input type="text" id="user-small-name" v-model="tel" placeholder="请输入手机号">
                    </div>
                    <div class="info-item">
                        <input type="text" v-model="pass" placeholder="请输入密码">
                    </div>
                </div>
            </div>
            <div class="btn">
                <div class="btn-log-in" @click="login">登录</div>
                <div class="go-to-register" @click="handleRegister">没有账号，点击注册</div>
            </div>
        </div>
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
          console.log(this);
          console.log(this.$store);
        },
        methods: {
            handleRegister(){
                this.$emit("changeState",2);
            },
            login(){
                if(!this.tel){
                    alert("请输入手机号");
                }else if(!this.pass){
                    alert("请输入密码");
                }else{
                    this.$store.dispatch({
                        type: 'login',
                        params: {
                            "tel" : this.tel,
                            "pass" : this.pass,

                        }
                    })
                }
            }
        },
        data(){
            return {
                sex : 1,
                tel : '',
                pass : ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .glyphicon-chevron-left{
        position:fixed;
        top:0;
        display:inline-block;
        width:0.4rem;
        height:0.6rem;
        line-height:0.6rem;
        margin-left:0.2rem;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: 400;
    }
    .main-content{
        margin-top:1.4rem;
        margin-bottom: 0.52rem;
        width:100%;
        .user-box{
            line-height:57px;
            text-align:center;
            img{
                width:0.8rem;
                height: 0.8rem;
                border-radius: 50%;
            }
        }
        .info-box{
            padding: 0.4rem;
            .info-item{
                width:100%;
                height: 0.47rem;
                line-height:0.47rem;
                border-bottom: 1px solid rgba(217,217,217,1);
                display: flex;
                label{
                    display:inline-block;
                    width:1rem;
                    padding-left:0.2rem;
                    text-align: left;
                }
                .area-no{
                    border-right: 1px solid rgba(217,217,217,1);
                }
                input{
                    width:100%;
                    padding-right:0.1rem;
                    text-align:left;
                    padding-left:0.2rem;
                }
            }
        }
        .btn{
            width:100%;
            .btn-log-in{
                margin:0.2rem;
                margin-bottom:0;
                height:0.4rem;
                line-height:0.4rem;
                text-align: center;
                color: #ffffff;
                background-color: #ff6e6e;
                border-radius: 0.1rem;
            }
            .go-to-register{
                margin:0.2rem;
                margin-bottom:0;
                height:0.4rem;
                line-height:0.4rem;
                text-align: center;
                color: #38f;
            }
        }
    }
</style>