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
}
}
   