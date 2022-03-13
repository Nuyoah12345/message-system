const state = {
    tabsList: [{
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
    }],
    currentMenu: {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
    }
}
const mutations = {
    ADDLIST(state, val) {
        const inc = state.tabsList.findIndex(i => i.name == val.name)
        // console.log(inc);
        if (inc === -1) {
            state.tabsList.push(val)
        }
        state.currentMenu = val
    },
    SHIFTLIST(state, index) {
        // tab焦点的处理
        const len = state.tabsList.length
        // console.log(index, len);
        if (state.currentMenu.name == state.tabsList[index].name) {
            if (index == len - 1) {
                state.currentMenu = state.tabsList[index - 1]
            } else {
                state.currentMenu = state.tabsList[index + 1]
            }
        }
        state.tabsList = state.tabsList.filter(item => item.name !== state.tabsList[index].name)
        // console.log(val, state.tabsList);
    }
}
const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

/* {
   path: "/page1",
   name: "page1",
   label: "页面1",
   icon: "setting",
   url: "Other/PageOne",
 } */