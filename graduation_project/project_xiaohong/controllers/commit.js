var commit_model = require('../models/commit_model.js');

module.exports =  {
    getCommitListByNoteId:function(req,response,next){
        var id = req.body.id;
        commit_model.getCommitListByNoteId(id,function(error,res){
            console.log(res);
            response.json(JSON.stringify(res));
        })
    },
    addCommon:function (req,response,next) {
        var commonInfo=req.body;
        var userId = req.cookies.userId;
        console.log(commonInfo+"::"+userId);
        commit_model.addCommon(userId,commonInfo,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    }
}