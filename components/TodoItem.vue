<template>
  <v-hover v-slot="{ hover }">
    <v-list-item class="align-baseline">
      <v-list-item-action class="align-self-baseline">
        <v-checkbox
          v-model="itemComplete"
          class="mt-0"
          color="secondary"
        ></v-checkbox>
      </v-list-item-action>

      <v-list-item-content class="align-self-baseline">
        <div class="text-h6" :class="[completedClass]">
          {{ item.title }}
        </div>
        <div v-if="item.content" class="text-subtitle-2">
          {{ item.content }}
        </div>
        <div class="text-caption text--secondary mt-2">
          {{ timestamp }}
        </div>
      </v-list-item-content>

      <v-list-item-action v-show="hover" class="align-self-baseline">
        <v-btn
          icon
          :aria-label="`Edit Todo - ${item.title}`"
          @click="$emit('edit')"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
        <v-btn
          icon
          :aria-label="`Remove Todo - ${item.title}`"
          @click="deleteTodo"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-list-item-action>
    </v-list-item>
  </v-hover>
</template>

<script>
export default {
  name: 'TodoListItem',
  props: {
    item: { type: Object, required: true },
  },
  computed: {
    itemComplete: {
      get() {
        return this.item.complete
      },
      set(value) {
        this.toggleTodo(value)
      },
    },
    completedClass() {
      return this.itemComplete ? 'text-decoration-line-through' : undefined
    },
    timestamp() {
      const item = this.item
      if (item.last_edited > 0) {
        return `Updated ${this.$moment(item.last_edited, 'X').format('LLL')}`
      } else {
        return `Created ${this.$moment(item.created, 'X').format('LLL')}`
      }
    },
  },
  methods: {
    async toggleTodo(value) {
      await this.$store.dispatch('toggleTodo', {
        todo: this.item,
        value,
      })
    },
    async deleteTodo() {
      await this.$store.dispatch('deleteTodo', this.item)
    },
  },
}
</script>

<style scoped></style>
