<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8">
      <v-card elevation="3">
        <v-toolbar color="primary" elevation="0" dark>
          <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp" class="mr-6">
            Todo Items
          </v-toolbar-title>
          <v-text-field
            v-model="searchValue"
            label="Search"
            prepend-icon="mdi-magnify"
            hide-details
            color="white"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="formOpen" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab x-small color="secondary" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title v-text="formTitle" />
              <v-card-text>
                <todo-form
                  :item="editItem"
                  class="mt-3"
                  @create="createTodo"
                  @update="updateTodo"
                ></todo-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-progress-linear
          :value="todoCompletion"
          color="secondary"
          height="10"
        >
        </v-progress-linear>
        <todo-list :items="filteredItems" @edit-item="openEdit"></todo-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: { TodoForm, TodoList },
  async fetch() {
    await this.$store.dispatch('fetchTodos')
  },
  data() {
    return {
      editItem: undefined,
      formOpen: false,
      searchValue: undefined,
    }
  },
  computed: {
    filteredItems() {
      if (this.searchValue) {
        return this.todoItems.filter((item) => {
          if (
            item.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            item.content.toLowerCase().includes(this.searchValue.toLowerCase())
          ) {
            return item
          }
        })
      }
      return this.todoItems
    },
    formTitle() {
      return this.editItem ? 'Edit Todo' : 'Create Todo'
    },
    ...mapState({ todoItems: (state) => state.todos }),
    ...mapGetters(['todoCompletion']),
  },
  methods: {
    openEdit(item) {
      this.editItem = item
      this.formOpen = true
    },
    async createTodo(todo) {
      await this.$store.dispatch('createTodo', todo)
      this.formOpen = false
    },
    async updateTodo(todo) {
      this.formOpen = false
      await this.$store.dispatch('editTodo', todo)
      this.editItem = undefined
    },
  },
}
</script>
