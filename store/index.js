export const state = () => ({
  todos: [],
  searchValue: undefined,
  localStorage: {
    completedItems: [],
  },
})

export const mutations = {
  SET_TODOS(state, todos) {
    state.todos = todos
  },
  UPDATE_TODO(state, todo) {
    const index = state.todos.findIndex((i) => i.id === todo.id)
    if (index >= 0) {
      state.todos.splice(index, 1, todo)
    }
  },
  REMOVE_TODO(state, todo) {
    const index = state.todos.findIndex((i) => i.id === todo.id)
    if (index >= 0) {
      state.todos.splice(index, 1)
    }
  },
  TOGGLE_COMPLETED_ITEM(state, { todo, completed }) {
    const completedItems = state.localStorage.completedItems
    if (completed) {
      state.localStorage.completedItems.push(todo.id)
    } else {
      state.localStorage.completedItems = completedItems.filter(
        (i) => i !== todo.id
      )
    }
  },
  SET_SEARCH(state, searchTerm) {
    state.searchValue = searchTerm
  },
}

export const actions = {
  async fetchTodos({ commit }) {
    const data = await this.$axios.$get('/')
    commit('SET_TODOS', data)
  },
  async createTodo({ dispatch }, todo) {
    await this.$axios.$post('/', todo)
    // Since the API only returns "Created" on success (or not) we fetch all todos.
    dispatch('fetchTodos')
  },
  async editTodo({ state, commit }, todo) {
    const data = await this.$axios.$put(`/${todo.id}`, todo)
    // Since the whole array is returned we update the list
    commit('SET_TODOS', data)
  },
  async deleteTodo({ commit }, todo) {
    await this.$axios.$delete(`/${todo.id}`)
    commit('REMOVE_TODO', todo)
  },
  toggleTodo({ commit, getters }, { todo, value }) {
    commit('TOGGLE_COMPLETED_ITEM', { todo, completed: value })
    return { celebrate: getters.todoCompletion === 100 }
  },
  updateSearch({ commit }, value) {
    commit('SET_SEARCH', value)
  },
}

export const getters = {
  /* These items include "completed" status from localStorage */
  formattedTodos: (state) => {
    return state.todos.map((item) => {
      return {
        ...item,
        complete: state.localStorage.completedItems.includes(item.id),
      }
    })
  },
  /* Simple filtering of searchValues presence in either title or content  */
  filteredItems: (state, getters) => {
    const searchTerm = state.searchValue
    if (searchTerm) {
      return getters.formattedTodos.filter((item) => {
        if (
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return item
        }
      })
    }
    return getters.formattedTodos
  },
  totalCount: (state) => {
    return state.todos.length
  },
  completedCount: (state, getters) => {
    return getters.formattedTodos.filter((item) => item.complete === true)
      .length
  },
  /* Overall completion of items, used for the progress bar */
  todoCompletion: (state, getters) => {
    if (getters.totalCount > 0) {
      return (getters.completedCount / getters.totalCount) * 100
    }
    return 0
  },
}
