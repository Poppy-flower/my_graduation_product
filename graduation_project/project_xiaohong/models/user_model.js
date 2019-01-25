var query = require('../DBconfig/query.js');

module.exports = {
    login:function (user,pass,callback) {
        let sql="select * from user where tel='" + user + "' and password='" + pass +"'";
        console.log(sql);
        query(sql,function (error,res) {
            callback(error,res)
        })
    },

    register:function (userInfo,callback) {
        let sql="insert into user(user_id,tel,password,state) values(null,'"+ userInfo.tel +"','"+ userInfo.pass +"',"+ userInfo.state +")";
        console.log(sql);
        query(sql,function (error,res) {
            callback(error,res)
        })
    },

    userNameReadyHave:function (tel,callback) {
        let sql="select * from user where tel='" + tel + "'";
        query(sql,function (error,res) {
            callback(error,res)
        })
    },
    getUserInfoByUserId:function (userId,callback) {
        let sql = `select * from user where user_id = ${userId}`;
        query(sql,function (error,res) {
            callback(error,res)
        })
    },
    saveUserInfo:function (userId,userInfo,callback){
        let name = userInfo.name;
        let sex = userInfo.sex;
        let address = userInfo.address;
        let email = userInfo.email;
        let sql = `update user set name='${name}',sex=${sex},address='${address}',email='${email}' where user_id = ${userId}`;
        query(sql,function (error,res) {
            callback(error,res)
        })
    },
}