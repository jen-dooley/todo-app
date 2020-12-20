<template>
  <v-slide-y-transition class="py-0" group tag="v-list">
    <todo-list-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      @edit="$emit('edit-item', item)"
    ></todo-list-item>
  </v-slide-y-transition>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'
export default {
  name: 'TodoList',
  components: { TodoListItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
