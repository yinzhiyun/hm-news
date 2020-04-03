import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  state: {
    catchList: []
  },
  mutations: {
    catch(state, name) {
      if (!state.catchList.includes(name)) {
        state.catchList.push(name);
      }
    },
    uncatch(state, name) {
      if (state.catchList.includes(name)) {
        state.catchList = state.catchList.filter(item => item !== name);
      }
    }
  }
});
export default store;
