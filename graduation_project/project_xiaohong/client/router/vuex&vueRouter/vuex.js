import axios from 'axios';

export default {
    state: {
        noteList: [],
        noteDetail: {},
        sceneDetail: {},
        commitList: [],
        userInfo : {},
        allNoteList: [],
        sceneList: []
    },
    mutations: {
        changeNoteList(state,payLoad){
            state.noteList = payLoad.value;
        },
        changeAllNoteList(state,payLoad){
            state.allNoteList = payLoad.value;
        },
        changeSceneList(state,payLoad){
            state.sceneList = payLoad.value;
        },
        changeCommitList(state,payLoad){
            state.commitList = payLoad.value;
        },
        getSceneDetailById(state,payLoad) {
            var sceneId = payLoad.id;
            state.sceneList.map((item,index) => {
                if(sceneId == item.id){
                    state.sceneDetail=item;
                }
            })
        },
        getNoteDetailById(state,payLoad) {
            var noteId = payLoad.id;
            console.log("state.noteList:",state.noteList);
            state.allNoteList.map((item,index) => {
                if(noteId == item.id){
                    state.noteDetail=item;
                }
            })
        },
    },
    actions: {
        getIndexNoteList(context,payLoad) {
            axios.post('/getIndexNoteList').then(res => {
                context.commit({
                    type: 'changeNoteList',
                    value: JSON.parse(res.data)
                });
            }).catch(function(e){
                console.log(e);
            });
        },
        getAllNoteList(context,payLoad) {
            axios.post('/getAllNoteList').then(res => {
                console.log("JSON.parse(res.data)",JSON.parse(res.data));
                context.commit({
                    type: 'changeAllNoteList',
                    value: JSON.parse(res.data)
                });
            }).catch(function(e){
                console.log(e);
            });
        },
        getSceneList(context,payLoad) {
            axios.post('/getSceneList').then(res => {
                console.log(JSON.parse(res.data));
                context.commit({
                    type: 'changeSceneList',
                    value: JSON.parse(res.data)
                });
            }).catch(function(e){
                console.log(e);
            });
        },

        getCommitListByNoteId(context,payLoad){
            axios.post('/getCommitListByNoteId',{id: payLoad.id}).then(res => {
                context.commit({
                    type: 'changeCommitList',
                    value: JSON.parse(res.data)
                })
            }).catch(function(e){
                console.log(e);
            })
        },
        login(context,payLoad){
            axios.post('/login',payLoad.params).then(res => {
                if(res.data == 'success'){
                    window.location.reload();
                }else{
                    alert(res.data);
                }
            }).catch(function(e){
                console.log(e);
           
            })
        },
        register(context,payLoad){
            axios.post('/userNameReadyHave',payLoad.params).then(res => {
                if(res.data == 'success'){
                    alert("手机号已经存在");
                }else{
                   axios.post('/register',payLoad.params).then(res => {
                        if(res.data == 'success'){
                            window.location.reload();
                        }else{
                            alert(res.data);
                        }
                    }).catch(function(e){
                        console.log(e);
                    })
                }
            }).catch(function(e){
                console.log(e);
           
            })
        },
        getUserInfoByUserId(context,payLoad){
            return new Promise(function (resolve,reject) {
                axios.post('/getUserInfoByUserId').then(res => {
                    resolve(JSON.parse(res.data));
                }).catch(function(e){
                    reject(e);
                })
            })

        },
        logout( context,payLoad){
            axios.get('/logout').then(res=>{
                if(res.data == 'success'){
                    window.location.reload();
                }else{
                    alert(res.data);
                }
            }).catch(function(e){
                console.log(e);
            })
        },
        saveUserInfo(context, payLoad){
            axios.post('/saveUserInfo', {userInfo: payLoad.params}).then(res => {
                if(res.data == 'success'){
                    window.location.reload();
                }else{
                    alert(res.data);
                }
            }).catch(function(e){
                console.log(e);
            })
        },
        saveNote(context, payLoad){

            axios.post('/saveNote', {noteInfo: payLoad.params}).then(res => {
                if(res.data == 'success'){
                    history.back();
                }else{
                    alert(res.data);
                }
            }).catch(function(e){
                console.log(e);
            })
        },
        searchNote(context, payLoad){
            axios.get('/searchNote?key='+payLoad.key).then(res => {
                console.log(JSON.parse(res.data));
                context.commit({
                    type: 'changeAllNoteList',
                    value: JSON.parse(res.data)
                });
            }).catch(function(e){
                console.log(e);
            });
        },
        searchScene(context, payLoad){
            axios.get('/searchScene?key='+payLoad.key).then(res => {
                console.log(JSON.parse(res.data));
                context.commit({
                    type: 'changeSceneList',
                    value: JSON.parse(res.data)
                });
            }).catch(function(e){
                console.log(e);
            });
        },
    },
    getters: {

    }
}