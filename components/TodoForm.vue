<template>
  <v-card>
    <v-card-title v-text="formTitle" />
    <v-card-text>
      <v-form ref="form" v-model="formValid" lazy-validation>
        <v-text-field
          v-model="form.title"
          label="Title"
          :rules="[(v) => !!v || 'Title is required']"
        ></v-text-field>
        <v-textarea
          v-model="form.content"
          label="Content"
          auto-grow
          rows="1"
        ></v-textarea>
        <v-btn
          :disabled="!formValid"
          :loading="loading"
          color="primary"
          class="mt-6"
          @click="validate"
          >Submit</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TodoForm',
  props: {
    item: {
      type: Object,
      default() {
        return {
          title: undefined,
          content: undefined,
        }
      },
    },
  },
  data() {
    return {
      loading: false,
      formValid: false,
      form: { ...this.item },
    }
  },
  computed: {
    formTitle() {
      return this.form.id ? 'Edit Todo' : 'Create Todo'
    },
  },
  methods: {
    async validate() {
      await this.$refs.form.validate()

      if (this.formValid) {
        await this.submitForm()
      }
    },
    async submitForm() {
      const todo = this.form
      this.loading = true

      if (this.item.id) {
        await this.$store.dispatch('editTodo', todo)
      } else {
        await this.$store.dispatch('createTodo', todo)
      }
      this.$emit('close')
      this.loading = false
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped></style>
