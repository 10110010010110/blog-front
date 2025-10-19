import request from './request';
export default {
    login(config){
        return request({
            url:'/user/login',
            method:'post',
            data:config
    })
},
    register(config){
        return request({
            url:'/user/register',
            method:'post',
            data:config
    })
},
    editUser(config){
        return request({
            url:'/user/edituser',
            method:'put',
            data:config
    })
},
    createPost(config){
        return request({
            url:'/post/createpost',
            method:'post',
            data:config
    })
},
    getPosts(data){
        return request({
            url:'/post/getposts',
            method:'get',
            data
    })
},
    editPost(config){
        return request({
            url:'/post/editpost',
            method:'put',
            data:config
    })
},
   deletePost(config){
        return request({
            url:'/post/deletepost',
            method:'delete',
            data:config
    })
}
}