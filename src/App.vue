<template>
  <div class="controls"></div>
  <div class="cards" v-if="displayedCharacters">
    <Card
      v-for="character in displayedCharacters"
      :key="character.id"
      :character="character"
    />
  </div>
  <div>{{ allCharacters?.length }}</div>
  <div>{{ allCharacters }}</div>
  <!-- <div>{{ allEpisodes?.length }}</div>
  <div>{{ allEpisodes }}</div> -->
</template>

<script>
import Card from './components/Card.vue'
import { getCharacters } from './api/characters'
// import { getEpisodes } from './api/episodes'

export default {
  name: 'App',
  components: {
    Card,
  },
  data() {
    return {
      allCharacters: null,
      // allEpisodes: null,
    }
  },
  computed: {
    displayedCharacters() {
      return this.allCharacters
    },
  },
  methods: {
    async go() {
      console.log(await getCharacters())
    },
  },
  async created() {
    this.allCharacters = await getCharacters()
    // this.allEpisodes = await getEpisodes()
  },
}
</script>

<style>
</style>
