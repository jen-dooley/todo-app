<template>
  <v-card>
    <v-card-title class="headline"> Project Brief </v-card-title>

    <v-card-text>
      <div class="text-subtitle-1 font-weight-bold mt-3">Description:</div>
      <p>
        The goal of this project is to see how you work by creating a simple
        to-do application. The creativity and complexity of the project is up to
        you. Creativity and complexity will help your score, but there has to be
        a balance with timeframe. Submitting a well executed project sooner than
        the due date will also help your score. Your goal is to create an
        application that shows the todo items for the user, allows new ones to
        be added, and allows items to be deleted. You do not need to worry about
        how the user is determined, an authentication key will be given.
      </p>
      <div class="text-subtitle-1 font-weight-bold mt-3">Timeframe:</div>
      <p>
        You will have until 1/8/2021 to submit a GitHub repository containing
        your work.
      </p>
      <div class="text-subtitle-1 font-weight-bold mt-3">
        Project Requirements:
      </div>
      <ul>
        <li>Should be able to run out of the box</li>
        <li>
          Should complete an action that utilizes each of the API endpoints
        </li>
        <li>Should have a clean UI</li>
        <li>Should be responsive to page size change</li>
      </ul>
      <div class="text-subtitle-1 font-weight-bold mt-3">API Specs:</div>
      <ul>
        <li>Auth Header should be set with provided credentials</li>
        <li>API URL - http://todo.powerspike.gg</li>
        <ul>
          <li>GET /</li>
          <li>POST /</li>
          <li>DELETE /{id}</li>
          <li>PUT /{id}</li>
        </ul>
      </ul>

      <p class="mt-3">
        The requirements for this project are being deliberately left vague as
        we are looking to see your creativity step in. Good luck!
      </p>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="$emit('close')"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectBrief',
}
</script>

<style scoped></style>
