var user_model = require('../models/user_model.js');

module.exports =  {
    login:function (req,res,next) {
        var username=req.body.tel;
        var password=req.body.pass;
        user_model.login(username,password,function (e,userInfo) {
            console.log(userInfo);
            if(userInfo[0] != undefined){
                res.cookie("isLogin", true);
                res.cookie("userId", userInfo[0].user_id);
                res.cookie("state", userInfo[0].state);
                res.send("success")
            }else{
                res.send("failed")
            }
        })
    },
    register:function (userInfo,callback) {
        user_model.register(userInfo,function(e,res){
            callback(e,res)
        })
    },
    userNameReadyHave(tel,callback){
        user_model.userNameReadyHave(tel,function(e,res){
            callback(e,res)
        })
    },
    logout:function(req, response, next) {
        response.clearCookie("isLogin");
        response.clearCookie("userId");
        response.clearCookie("state");
        response.send("success")
    },
    getUserInfoByUserId:function(req, response, next) {
        var userId = req.cookies.userId;
        if(userId){
            user_model.getUserInfoByUserId(userId,function (e,res) {
                response.json(JSON.stringify(res[0]));
            })
        }
    },
    saveUserInfo:function(req,response, next){
        var userInfo = req.body.userInfo.userInfo;
        console.log(userInfo);
        var userId = req.cookies.userId;
        user_model.saveUserInfo(userId,userInfo,function (e,res) {
            if(res){
                response.send('success');
            }else{
                response.send('failed');
            }
        })
    }
}