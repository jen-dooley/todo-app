export const state = () => ({
  todos: [],
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
}

export const actions = {
  async fetchTodos({ state, commit }) {
    const data = await this.$axios.$get('/')
    const todos = data.map((item) => {
      const index = state.todos.findIndex((i) => i.id === item.id)

      return {
        ...item,
        complete: index >= 0 ? state.todos[index].complete : false,
      }
    })

    commit('SET_TODOS', todos)
  },
  async createTodo({ dispatch }, todo) {
    await this.$axios.$post('/', todo)
    dispatch('fetchTodos')
  },
  async editTodo({ state, commit }, todo) {
    const data = await this.$axios.$put(`/${todo.id}`, todo)
    const todos = data.map((item) => {
      const index = state.todos.findIndex((i) => i.id === item.id)

      return {
        ...item,
        complete: index >= 0 ? state.todos[index].complete : false,
      }
    })
    commit('SET_TODOS', todos)
  },
  async deleteTodo({ commit }, todo) {
    await this.$axios.$delete(`/${todo.id}`)
    commit('REMOVE_TODO', todo)
  },
  toggleTodo({ commit, getters }, { todo, value }) {
    commit('UPDATE_TODO', { ...todo, complete: value })
    return { celebrate: getters.todoCompletion === 100 }
  },
}

export const getters = {
  totalTodos: (state) => {
    return state.todos.length
  },
  completedTodos: (state) => {
    return state.todos.filter((item) => item.complete === true).length
  },
  todoCompletion: (state, getters) => {
    return (getters.completedTodos / getters.totalTodos) * 100
  },
}
