<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card elevation="3">
        <v-toolbar color="primary" elevation="0" dark>
          <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp" class="mr-6">
            Todo Items
          </v-toolbar-title>
          <v-text-field
            :value="searchValue"
            label="Search"
            prepend-icon="mdi-magnify"
            hide-details
            color="white"
            @input="updateSearchValue"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="formOpen"
            width="500"
            @click:outside="editItem = null"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                color="secondary"
                aria-label="Create Todo"
                class="font-weight-bold"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="mr-2" small>mdi-plus</v-icon>
                Create
              </v-btn>
            </template>
            <todo-form
              :key="formKey"
              :item="editItem"
              @close="closeForm"
            ></todo-form>
          </v-dialog>
        </v-toolbar>
        <v-progress-linear
          :value="todoCompletion"
          color="secondary"
          height="10"
        >
        </v-progress-linear>
        <v-slide-y-transition group tag="v-list">
          <template v-for="(item, index) in todoItems">
            <v-divider v-if="index > 0" :key="index" inset></v-divider>
            <todo-item
              :key="item.id"
              :item="item"
              @edit="openForm(item)"
            ></todo-item>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TodoItem from '@/components/TodoItem'
import TodoForm from '@/components/TodoForm'

export default {
  name: 'HomePage',
  components: { TodoItem, TodoForm },
  async fetch({ store }) {
    await store.dispatch('fetchTodos')
  },
  data() {
    return {
      editItem: undefined,
      formOpen: false,
    }
  },
  computed: {
    formKey() {
      return this.editItem ? this.editItem.id : 'create-form'
    },
    ...mapState({ searchValue: (state) => state.searchValue }),
    ...mapGetters({
      todoItems: 'filteredItems',
      todoCompletion: 'todoCompletion',
    }),
  },
  methods: {
    openForm(item) {
      this.editItem = item
      this.formOpen = true
    },
    closeForm() {
      this.editItem = undefined
      this.formOpen = false
    },
    async updateSearchValue(value) {
      await this.$store.dispatch('updateSearch', value)
    },
  },
}
</script>
