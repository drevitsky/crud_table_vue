import Vue from 'vue'
import Vuex from 'vuex'
import { titles, items } from './initialData.json'
// import items from './initialData.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titlesTable: titles,
    userList: items,
    currentPage: 1
  },
  mutations: {
    ADD_NEW_ROW: (state, newRow) => {
      state.userList.push(newRow)
    },
    UPDATE_ROW: (state, {
      user,
      id
    }) => {
      const index = state.userList.findIndex(item => {
        return item.id === id
      })
      state.userList[index] = user
    },
    REMOVE_ROW: (state, id) => {
      state.userList = state.userList.filter((item) => {
        if (item.id !== id) {
          return item
        }
      })
    },
    SET_CURRENT: (state, currentPage) => {
      state.currentPage = currentPage
    }
  },
  actions: {
    addNewRow (store, { newRow }) {
      store.commit('ADD_NEW_ROW', newRow)
    },
    updateRow (store, {
      user,
      id
    }) {
      store.commit('UPDATE_ROW', {
        user,
        id
      })
    },
    removeRow (store, id) {
      store.commit('REMOVE_ROW', id)
    },
    setCurrentPage (store, currentPage) {
      store.commit('SET_CURRENT', currentPage)
    }
  },
  modules: {
  },
  getters: {
    userList: state => state.userList,
    titlesTable: state => state.titlesTable
  }
})
