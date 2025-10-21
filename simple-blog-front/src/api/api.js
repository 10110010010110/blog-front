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
        const{id,...rest} = config
        return request({
            url:`/user/edituser/${id}`,
            method:'put',
            data:rest
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
        const {id,...rest} = config
        return request({
            url:`/post/editpost/${id}`,
            method:'put',
            data:rest
    })
},
   deletePost(config){
        return request({
            url:'/post/deletepost',
            method:'delete',
            data:config
    })
},
    getPostNumber(data){
        return request({
            url:'/post/getpostnumber',
            method:'get',
            data
            
    })        
},
}