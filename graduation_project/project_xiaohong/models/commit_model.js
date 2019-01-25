var query = require('../DBconfig/query.js');

module.exports = {
    getCommitListByNoteId: function(id,callback){
        let sql = `select * from commit as c,user as u where c.user_id=u.user_id and c.note_id = ${id}`;
        query(sql,function(error,res){
            callback(error,res);
        })
    },
    addCommon:function (userId,commonInfo,callback) {
        let sql = "insert into commit(user_id,text,note_id) values("+ userId +",'"+ commonInfo.text +"',"+ commonInfo.noteId +")";
        console.log(sql);
        query(sql, function (error, res) {
            callback(error, res)
        })
    }
}