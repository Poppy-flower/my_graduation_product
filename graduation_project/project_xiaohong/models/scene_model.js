var query = require('../DBconfig/query.js');

module.exports = {
    getSceneList: function(callback){
        let sql = `select * from scene`;
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    searchScene: function(key,callback){
        let sql = "select * from scene where name like '%"+ key +"%'";
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    saveSceneInfo: function(sceneInfo,callback){
        let sql = "update scene set name='"+ sceneInfo.name +"',text='"+ sceneInfo.text +"',history='"+ sceneInfo.history +"',bus='"+ sceneInfo.bus +"',img1='"+ sceneInfo.img1 +"',img2='"+ sceneInfo.img2 +"' where id="+sceneInfo.id;
        console.log(sql);
        query(sql,function(error,res){
            callback(error,res);
        })
    }
}