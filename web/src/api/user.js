import request from '../utils/request'

export function login(data) {
    // return Promise.resolve('success')
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}

export function Register(data) {
    // console.log('Register66',data)
    // return Promise.resolve('success')
    return request({
        url: '/users',
        method: 'post',
        data,
    })
}

export function info(data) {
    // console.log('login666',data)
    // return Promise.resolve('success')
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}

export function updateInfo(data) {
    console.log('login666',data)
    // return Promise.resolve('success')
    return request({
        url: '/users',
        method: 'patch',
        headers:{
            token:window.sessionStorage.getItem('token')
        },
        data
    })
}

