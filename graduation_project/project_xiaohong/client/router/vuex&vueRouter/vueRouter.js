import login from '../vue/login.vue';
import register from '../vue/register.vue';
import index from '../vue/index.vue';
import mine from '../vue/mine.vue';
import note from '../vue/note.vue';
import noteDetail from '../vue/noteDetail.vue';
import noteEdit from '../vue/noteEdit.vue';
import sceneList from '../vue/sceneList.vue';
import sceneDetail from '../vue/sceneDetail.vue';

export default {
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'register',
            component: register
        },
        {
            path: '/sceneList',
            name: 'sceneList',
            component: sceneList
        },
        {
            path: '/note',
            name: 'note',
            component: note
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/noteDetail/:id',
            name: 'noteDetail',
            component: noteDetail
        },
        {
            path: '/noteEdit',
            name: 'noteEdit',
            component: noteEdit
        },
        {
            path: '/sceneDetail/:id',
            name: 'sceneDetail',
            component: sceneDetail
        }
    ]
}