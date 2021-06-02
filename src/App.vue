<template>
  <div class="controls">
    <div class="controls__sort">
      <span class="controls__sort-label">Sort by</span>
      <select @change.once="setDefaultSortDirection" name="sort-field" v-model="sortField" class="controls__sort-selector bordered">
        <option value="name">name</option>
        <option value="first episode">first episode</option>
      </select>
      <input id="asc" v-model="sortDirection" value="asc" type="radio" name="sort-direction" class="controls__sort-direction hidden" />
      <label for="asc" class="controls__sort-asc">
        <svg class="icon"><use xlink:href="symbols.svg#icon-sort-asc" /></svg>
      </label>
      <input id="desc" v-model="sortDirection" value="desc" type="radio" name="sort-direction" class="controls__sort-direction hidden" />
      <label for="desc" class="controls__sort-desc">
        <svg class="icon"><use xlink:href="symbols.svg#icon-sort-desc" /></svg>
      </label>
    </div>

  </div>
  <div class="cards" v-if="displayedCharacters.length">
    <Card
      v-for="character in displayedCharacters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<script>
import Card from './components/Card.vue'
import { getCharacters } from './api/characters'

export default {
  name: 'App',
  components: {
    Card,
  },
  data() {
    return {
      allCharacters: [],
      sortField: null,
      sortDirection: null, // TODO set Asc as default
      // TODO set UI feedback
    }
  },
  computed: {
    displayedCharacters() {
      if (this.sortField) {
        const sortArray = this.allCharacters.map((character, index) => {
          return {
            value: this.sortField === 'first episode' ? character.episode[0].episode : character.name,
            index,
          }
        })

        sortArray.sort((a, b) => {
          if (a.value < b.value) {
            return this.sortDirection === 'desc' ? 1 : -1
          }
          if (a.value > b.value) {
            return this.sortDirection === 'desc' ? -1 : 1
          }
          return 0
        })

        return sortArray.map(el => this.allCharacters[el.index])
      } else {
        return this.allCharacters
      }
    },
  },
  methods: {
    async go() {
      console.log(await getCharacters())
    },
    setDefaultSortDirection() {
      this.sortDirection = 'asc'
    },
  },
  async created() {
    this.allCharacters = await getCharacters()
  },
}
</script>

<style>
</style>
