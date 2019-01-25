var scene_model = require('../models/scene_model.js');

module.exports =  {
    getSceneList:function(req,response,next){
        scene_model.getSceneList(function(error,res){
            response.json(JSON.stringify(res));
        })
    },
    searchScene:function(req,response,next){
        var key = req.query.key;
        scene_model.searchScene(key,function(error,res){
            response.json(JSON.stringify(res));
        })
    },
    saveSceneInfo:function(req,response,next){
        var sceneInfo = req.body;
        scene_model.saveSceneInfo(sceneInfo,function(error,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
}