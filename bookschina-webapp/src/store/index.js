import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //类似vue实例里面的data，用于存放数据，一般存放公共状态数据
    currentIndex:0
  },
  mutations: {
    //类似我们methods方法,但是一般是写基础方法，逻辑简单，对state的数据的增删改查的方法写在这里
    change(state,payload){
      /**
       *@payload 形参，载荷，只能写一个参数，如果要传多个数据，请写成对象的格式
       */
      state.currentIndex = payload
    }
  },
  actions: {
    //类似我们methods方法，但是一般写业务逻辑比较复杂或异步的代码
    //官方推荐，在actions里面，调用mutations的方法
    changeIndex(context,payload){
      context.commit('change',payload)
    }
  },
  modules: {}
});
