const state = {
    user: null
  };
  
  const mutations = {
    setUser(state, user) {
      state.user = user;
    }
  };
  
  const actions = {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setUser', null);
    }
  };
  
  const getters = {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  