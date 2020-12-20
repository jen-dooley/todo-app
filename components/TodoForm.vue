<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="form.title" label="Title"></v-text-field>
    <v-textarea
      v-model="form.content"
      label="Content"
      auto-grow
      rows="1"
    ></v-textarea>
    <v-btn type="submit" color="primary" class="mt-6">Submit</v-btn>
  </v-form>
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
      form: { ...this.item },
    }
  },
  methods: {
    submitForm() {
      if (this.item.id) {
        this.$emit('update', this.form)
      } else {
        this.$emit('create', this.form)
      }
      this.form = {
        title: undefined,
        content: undefined,
      }
    },
  },
}
</script>

<style scoped></style>
