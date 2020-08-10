// 按需引入 Element 组件
import {
    Swipe, 
    SwipeItem,
    Dialog,
    Notify,
    Lazyload,
    Field,
    NoticeBar,
    Rate,
    Tab, 
    Tabs,
    Tabbar, 
    TabbarItem,
    Sidebar, SidebarItem,
    Checkbox, CheckboxGroup,
    Uploader,
    Button,
    Icon
} from 'vant'

let vants = [
    Swipe, 
    SwipeItem,
    Dialog,
    Notify,
    Lazyload,
    Field,
    NoticeBar,
    Rate,
    Tab, 
    Tabs,
    Tabbar, 
    TabbarItem,
    Sidebar, SidebarItem,
    Checkbox, CheckboxGroup,
    Uploader,
    Button,
    Icon
]

export default {
    install(Vue) {
        vants.forEach(vant => [
            // Vue.component(elementUI.name, elementUI)
            Vue.use(vant)    // 也可以使用 Vue.use()
        ])

    }
}