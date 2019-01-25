<template>
    <div>
        <div class="mine" v-if="loginFlag == 0">
            <topHeader title="个人信息管理"></topHeader>
            <span class="glyphicon glyphicon-floppy-saved" @click="saveUserInfo"></span>
            <div class="main-content">
                <div class="user-box">
                    <img src="../imgs/user.jpeg" alt="">
                    <p>{{tel}}</p>
                </div>
                <div class="info-box">
                    <div>
                        <div class="info-item">
                            <label for="user-name">用户名</label>
                            <input type="text" id="user-name" placeholder="请输入用户名" v-model="tel" disabled>
                        </div>
                        <div class="info-item">
                            <label for="user-small-name">昵称</label>
                            <input type="text" id="user-small-name" placeholder="请输入昵称" v-model="name">
                        </div>
                        <div class="info-item">
                            <label>性别</label>
                            <div class="check-sex">
                                <span class="sex" :class="{'selected': sex == 1}" @click="changeSex(1)">男</span>
                                <span class="sex" :class="{'selected': sex == 0}" @click="changeSex(0)">女</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <label for="user-adress">地址</label>
                            <input type="text" id="user-adress" placeholder="请输入地址" v-model="address">
                        </div>
                        <div class="info-item">
                            <label for="user-email">邮箱</label>
                            <input type="text" id="user-email" placeholder="请输入邮箱" v-model="email">
                        </div>
                    </div>
                </div>
                <div class="log-out">
                    <div class="btn" @click="logout">退出登录</div>
                </div>
            </div>
            <tabs select='mine'></tabs>
        </div>
        <login_C v-if='loginFlag == 1' @changeState="change"></login_C>
        <register_C v-if='loginFlag == 2' @changeState="change"></register_C>
    </div>

</template>
<script>
    import topHeader from "./components/header.vue";
    import tabs from "./components/tabs.vue";
    import login_C from "./login.vue";
    import register_C from "./register.vue";
    import login from "../js/login.js"
    export default {
        components: {
            topHeader: topHeader,
            tabs: tabs,
            login_C:login_C,
            register_C: register_C
        },
        methods:{
            change(value){
              this.loginFlag=value;
            },
            loginChecked(){
                var userId = login.util.getDataFromCookies("userId");
                if(!userId){
                    this.loginFlag= 1;
                }else{
                    this.loginFlag= 0;
                    this.$store.dispatch({
                        type: 'getUserInfoByUserId'
                    }).then(data => {
                        this.name=data.name;
                        this.tel=data.tel;
                        this.email=data.email;
                        this.address=data.address;
                        this.sex=data.sex;
                    })
                }
            },
            logout(){
                this.$store.dispatch({
                    type: 'logout'
                })
            },
            changeSex(sex){
                this.sex=sex;
            },
            saveUserInfo(){
                this.$store.dispatch({
                    type: 'saveUserInfo',
                    params: {
                        userInfo: {
                            name: this.name,
                            email: this.email,
                            address: this.address,
                            sex: this.sex
                        }
                    }
                })
            }
        },
        computed:{
            userInfo(){
                console.log(this.$store.state.userInfo);
                return this.$store.state.userInfo;
            }
        },
        mounted(){
            this.loginChecked();
        },
        data(){
            return {
                sex : 1,
                loginFlag:1,
                name: '',
                address: '',
                email: '',
                tel:''
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
        width:100%;
        .user-box{
            display: flex;
            line-height:57px;
            padding: 0.3rem 0.2rem;
            img{
                width:0.57rem;
                height: 0.57rem;
                border-radius: 50%;
            }
            p{
                display:inline-block;
                width:100%;
                padding-left:0.1rem;
            }
        }
        .info-box{
            padding: 0 0.2rem;
            .info-item{
                width:100%;
                height: 0.47rem;
                line-height:0.47rem;
                border-bottom: 1px solid rgba(217,217,217,1);
                display: flex;
                label{
                    display:inline-block;
                    width:1.5rem;
                    padding-left:0.1rem;
                    text-align: left;
                }
                input{
                    width:100%;
                    padding-right:0.1rem;
                    text-align:right;
                }
                .check-sex{
                    display:inline-block;
                    text-align:right;
                    padding-right:0.1rem;
                    width:100%;
                    span{
                        display:inline-block;
                        width:0.4rem;
                        height:0.25rem;
                        background-color:rgba(248, 248, 248, 0.82);
                        text-align:center;
                        line-height:0.25rem;
                        margin-left:0.1rem;
                        -webkit-border-radius: 0.2rem;
                        -moz-border-radius: 0.2rem;
                        border-radius: 0.2rem;
                        color: #fff;
                    }
                    .selected{
                        background-color: #ff6e6e;
                    }
                }
            }
        }
        .log-out{
            padding:0.2rem;
            .btn{
                width:100%;
                height:0.4rem;
                line-height:0.28rem;
                text-align: center;
                color: #ffffff;
                background-color: #ff6e6e;
                border-radius: 0.1rem;
            }
        }
    }
</style>