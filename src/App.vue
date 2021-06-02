<template>
  <div class="controls">
    <div class="controls__sort">
      <span class="controls__sort-label">Sort by</span>
      <select @change.once="setDefaultSortDirection" name="sort-field" v-model="sortField" class="controls__selector bordered">
        <option value="name">name</option>
        <option value="first episode">first episode</option>
      </select>
      <input id="asc" v-model="sortDirection" value="asc" type="radio" name="sort-direction" class="controls__sort-direction hidden" />
      <label for="asc">
        <svg class="icon"><use xlink:href="symbols.svg#icon-sort-asc" /></svg>
      </label>
      <input id="desc" v-model="sortDirection" value="desc" type="radio" name="sort-direction" class="controls__sort-direction hidden" />
      <label for="desc">
        <svg class="icon"><use xlink:href="symbols.svg#icon-sort-desc" /></svg>
      </label>
    </div>

    <div class="controls__filter">
      <span class="controls__filter-label">Filter for</span>
      <select @change="activateFilter" name="filter-field" v-model="filterName" class="controls__selector bordered">
        <option v-for="character in charactersSortedByNameAsc"
          :key="character.id"
          :value="character.name">{{ character.name }}</option>
      </select>
      <input id="filter" v-model="filterIsActive" type="checkbox" class="controls__filter-active hidden" />
      <label for="filter" @click.prevent="removeFilter">
        <svg class="icon"><use xlink:href="symbols.svg#icon-filter" /></svg>
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
      charactersSortedByNameAsc: [],
      filterName: null,
      filterIsActive: false,
      sortField: null,
      sortDirection: null,
    }
  },
  computed: {
    displayedCharacters() {
      if (this.filterName) {
        return this.allCharacters.filter(char => char.name === this.filterName)
      }

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
    activateFilter() {
      this.filterIsActive = true
    },
    removeFilter() {
      this.filterIsActive = false
      this.filterName = null
    },
  },
  async created() {
    this.allCharacters = await getCharacters()
    this.charactersSortedByNameAsc = this.allCharacters.slice().sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }
      return 0
    })
  },
}
</script>

<style>
</style>
