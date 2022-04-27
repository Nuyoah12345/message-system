import { reqLogin } from "@/api/main"
import { reqUserList } from "@/api/main"
import { getkeyuser } from "@/api/main"

export default {
    namespaced: true,
    state: {
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        tableData: {}
    },
    mutations: {
        SETTOKEN(state, val) {
            state.token = val
        },
        SETUSERLIST(state, val) {
            state.tableData = val
        },
        QUITLOGIN(state, val) {
            state.token = ''
        }
    },
    actions: {
        // 登陆发请求
        async login(context, val) {
            let data = { username: val.username, password: val.password }
            // 用于post 以application / x-www-form-urlencoded格式发送数据
            // data = qs.stringify(data)
            // console.log(data);
            let res = await reqLogin(data)
            if (res.status == 1) return alert('用户名或密码错误')

            // console.log(res);
            context.commit('SETTOKEN', res.token)
            sessionStorage.setItem('token', res.token)
        },
        // 点击用户管理发请求
        async getuserlist(context, page) {
            let res = await reqUserList(context.state.token, page)

            // console.log(res);
            context.commit('SETUSERLIST', res.data)
        },
        // 关键字搜索发请求
        async getkeyuser(context, val) {
            // console.log(val);
            if (val.keyword == '') {
                let res = await reqUserList(context.state.token)
                context.commit('SETUSERLIST', res.data)
            } else {
                let res = await getkeyuser(context.state.token, val)
                // console.log(res);
                context.commit('SETUSERLIST', res.data)
            }

        },

        quitLogin(context, val) {
            sessionStorage.removeItem('token')
            context.commit("QUITLOGIN")
        }
    }
}