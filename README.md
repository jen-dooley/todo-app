# PowerSpike Code Challenge: Todo App

[![Netlify Status](https://api.netlify.com/api/v1/badges/079aa890-c257-4c52-9dd6-a0e469cfe93c/deploy-status)](https://romantic-banach-500938.netlify.app)

## Project Steps

#### Setup Development Environment

This application is created in Nuxt.js, Vuetify and a few small packages. I chose Nuxt.js because it is allows me to get a project going quickly. I decided to use Vuetify for this project because it is what is used at PowerSpike.

Additional packages used are vue-luxon for datetime display, nuxt-vuex-localstorage for localStorage since Nuxt prevents normal `window.localStorage`, and vue-confetti for flair.

#### Build UI

I wanted to show my ability to create something great using Vuetify without altering the native styles too much, and I wanted to play with dark mode since I had never worked with it before. I created a fairly basic but clean UI that utilizes custom light and dark themes and the theme is automatically set based on the user's system settings.

#### Add Server Integration

After creating the UI, I wrote the server integration and realized a few things:

- POST and PUT requests must be in `multipart/form-data` format.
- PUT requests require the full object, not just the updated fields.
- Items have a strict structure and keys can not be added.
- `created` and `last_edited` dates are in unix second format instead of iso.

Since items have a strict structure and don't have a value for completion, I could either delete items when they were completed, use `last_edited` as an indication of completion or think outside the box. Since I wanted to be able to edit, delete and complete items I had to find another way to implement completion. I chose to track completion locally and use localStorage to retain these completion values for the user.

#### Build a Vuex Store to handle local completion

Before this point my application had been set up to handle requests from the page but when I ran into my "completion problem" I decided this would be a fantastic chance for me to show off my experience with Vuex.

As an added benefit this also allowed me to simplify many of my components and reduce custom events.

#### Add some flair!

For flair, I added the light/dark themes, a background pattern from [Hero Patterns](https://www.heropatterns.com/), search functionality and completion confetti.

#### Deploy

I have deployed this application to Netlify as well, and it can be viewed [here](https://romantic-banach-500938.netlify.app/).

#### Notes

I did not end up writing testing for this application since I got way too excited at the beginning, I ended up testing everything manually.

In total, I built this application in about 12 hours of work time.

## Build Setup

```bash
# create .env file and populate AUTH_KEY
$ cp .env.example .env

# install dependencies
$ npm install

# build and launch project
$ npm run build
$ npm run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
