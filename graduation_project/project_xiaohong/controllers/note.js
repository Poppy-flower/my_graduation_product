var note_model = require('../models/note_model.js');

module.exports =  {
    getIndexNoteList:function(req,response,next){
        note_model.getIndexNoteList(function(error,res){
            response.json(JSON.stringify(res));
        })
    },
    getAllNoteList:function(req,response,next){
        console.log(111);
        note_model.getAllNoteList(function(error,res){
            response.json(JSON.stringify(res));
        })
    },
    getNoteDetailById:function(req,response,next){
        var id = req.body.id;
        note_model.getNoteDetailById(id,function(error,res){
            response.json(JSON.stringify(res[0]));
        })

    },
    searchNote:function(req,response,next){
        var key = req.query.key;
        note_model.searchNote(key,function(error,res){
            response.json(JSON.stringify(res));
        })
    },
    saveNote:function(req,response, next){
        var noteInfo = req.body.noteInfo.noteInfo;
        console.log(noteInfo);
        var userId = req.cookies.userId;
        note_model.saveNote(userId,noteInfo,function (e,res) {
            if(res){
                response.send('success');
            }else{
                response.send('failed');
            }
        })
    },
    saveNoteInfo:function(req,response,next){
        var noteInfo = req.body;
        note_model.saveNoteInfo(noteInfo,function(error,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    }
}