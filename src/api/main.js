import request from './request.js'

export const reqEchart = (token) => request({ url: '/my/getEcharts', headers: { 'Authorization': token } })

export const reqLogin = (data) => request({
    url: '/api/login',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data
})

export const reqUserList = (token, page) => request({ url: '/my/getuserlist', headers: { 'Authorization': token }, params: { page } })

export const getkeyuser = (token, params) => request({ url: '/my/getkeyuser', method: 'get', headers: { 'Authorization': token }, params })
