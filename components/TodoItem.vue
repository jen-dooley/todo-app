<template>
  <v-hover v-slot="{ hover }">
    <v-list-item>
      <v-list-item-action class="align-self-baseline">
        <v-checkbox
          v-model="itemComplete"
          :aria-label="`Complete Todo - ${item.title}`"
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
      <!-- Min width here is used to prevent text from moving when hovered -->
      <v-list-item-action
        class="align-self-baseline ml-0 ml-sm-3 my-0"
        style="min-width: 48px"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="hover"
              icon
              :aria-label="`Edit Todo - ${item.title}`"
              v-bind="attrs"
              v-on="on"
              @click="$emit('edit')"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="hover"
              icon
              :aria-label="`Remove Todo - ${item.title}`"
              v-bind="attrs"
              v-on="on"
              @click="deleteTodo"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </template>
          <span>Remove</span>
        </v-tooltip>
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
    // Used a computed item here so I can use v-model on the value
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

      // Dates are in unix seconds format instead of iso so we need to tell moment
      if (item.last_edited > 0) {
        return `Updated ${this.$moment(item.last_edited, 'X').format('LLL')}`
      } else {
        return `Created ${this.$moment(item.created, 'X').format('LLL')}`
      }
    },
  },
  methods: {
    async toggleTodo(value) {
      const { celebrate } = await this.$store.dispatch('toggleTodo', {
        todo: this.item,
        value,
      })
      if (celebrate) {
        this.$root.$emit('celebrate')
      }
    },
    async deleteTodo() {
      await this.$store.dispatch('deleteTodo', this.item)
    },
  },
}
</script>

<style scoped></style>
