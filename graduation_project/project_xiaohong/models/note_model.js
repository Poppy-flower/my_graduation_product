var query = require('../DBconfig/query.js');

module.exports = {
    getIndexNoteList: function(callback){
        let sql = `select * from note limit 10`;
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    getAllNoteList: function(callback){
        let sql = `select * from note`;
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    getNoteDetailById: function(id,callback){
        let sql = `select * from note where id = ${id}`;
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    searchNote: function(key,callback){
        let sql = "select * from note where title like '%"+ key +"%'";
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    saveNote:function (userId,noteInfo,callback){
        let title = noteInfo.title;
        let text = noteInfo.text;
        let sql = "insert into note(id,text,user_id,title) values(null,'"+ text +"',"+ user +",'"+ title +"')";
        query(sql,function (error,res) {
            callback(error,res)
        })
    },
    saveNoteInfo: function(noteInfo,callback){
        let sql = "update note set text='"+ noteInfo.text +"',img1='"+ noteInfo.img1 +"',img2='"+ noteInfo.img2 +"' where id="+noteInfo.id;
        console.log(sql);
        query(sql,function(error,res){
            callback(error,res);
        })
    }
}