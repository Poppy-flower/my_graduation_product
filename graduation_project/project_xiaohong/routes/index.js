var express = require('express');
var router = express.Router();

var note = require('../controllers/note.js');
var commit = require('../controllers/commit.js');
var user = require('../controllers/user.js');
var scene = require('../controllers/scene.js');
var formidable = require("formidable");
var fs = require("fs")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('router');
});

router.post('/login', user.login);

router.post('/userNameReadyHave', function(req, res, next) {
    var tel=req.body.tel;
    user.userNameReadyHave(tel,function (e,userInfo) {
        console.log(userInfo);
        if(userInfo[0] != undefined){
            res.send("success")
        }else{
            res.send("failed")
        }
    })
});

router.post('/register', function(req, res, next) {
    var userInfo=req.body;
    user.register(userInfo,function (e,userInfo) {
        console.log(userInfo);
        if(userInfo.affectedRows > 0){
            res.cookie("isLogin", true);
            res.cookie("userId", userInfo.insertId);
            res.cookie("state", req.body.state);
            res.send("success")
        }else{
            res.send("failed")
        }
    })
});
router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir='upload';
    form.parse(req, function(err, fields, files) {
        // console.log('fields',fields);//表单传递的input数据
        // console.log('files',files.file.path);//上传文件数据
        if(err){
            console.log(err);
        }else{
            console.log(files.file.name)
            console.log(files.file.path)
            //文件暂时存放的文件夹
            //移动文件到指定文件夹
            fs.rename(files.file.path, 'upload/' + files.file.name);
            var obj={
                "state":"success",
                "imgSrc":files.file.name
            }
            res.json(JSON.stringify(obj));
        }


    });
});

router.post('/getIndexNoteList',note.getIndexNoteList);
router.post('/getAllNoteList',note.getAllNoteList);
router.post('/getSceneList',scene.getSceneList);
router.post('/getNoteDetailById',note.getNoteDetailById);
router.post('/getCommitListByNoteId',commit.getCommitListByNoteId);
router.post('/getUserInfoByUserId',user.getUserInfoByUserId);
router.post('/saveUserInfo',user.saveUserInfo);
router.post('/saveNote',note.saveNote);
router.get("/searchNote",note.searchNote);
router.get("/searchScene",scene.searchScene);
router.post('/addCommon',commit.addCommon);
router.post('/saveSceneInfo',scene.saveSceneInfo);
router.post('/saveNoteInfo',note.saveNoteInfo);
router.get('/logout', user.logout);

module.exports = router;


