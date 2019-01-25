let util = {};
import Vue from "vue"
import login from "../vue/login.vue"
let getEl = function () {
    return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
};
util.login = function(){
    var _this=this;
    return new Promise(function (resolve,reject) {
        var userId = _this.getDataFromCookies("userId");
        if(!userId){
            console.log(1);
            new Vue({
                components:{
                    login:login
                },
                template:'<login></login>',
                el: $(".app")[0].appendChild(document.createElement('div'))
            })
        }else{
            console.log(2);
            resolve();
        }
    })
}

util.getDataFromCookies = function (key) {
    var cookies=document.cookie.replace(" ","");
    var result=null;
    if(cookies != []){
        if(document.cookie.toString().indexOf(key)!=-1){
            if(document.cookie.toString().indexOf(";")!=-1){
                cookies.split(";").map(function (item) {
                    if(item.replace(" ","").split("=")[0].toString() == key){
                        result=item.split("=")[1].toString();
                    }
                });
            }else{
                result=document.cookie.toString().split("=")[1].toString();
            }
        }else{
            result = false;
        }
    }else{
        result = false;
    }
    return result;
};
export default {
    util
}