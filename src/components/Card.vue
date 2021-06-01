<template>
  <div class="card">
    <img class="card__image" :src="character.image" :alt="character.name">
    <div class="card__info">
      <h3 class="card__name">{{ character.name }}</h3>
      <h4 class="card__type">&ndash; {{ character.species }} &ndash; {{ character.gender.toLowerCase() }} &ndash;</h4>
      <div class="card__episodes">
        <Episode v-for="episode in character.episode" :key="episode.key" :episode=episode />
      </div>
    </div>
  </div>
</template>

<script>
import Episode from './Episode'
export default {
  name: 'Card',
  props: ['character'],
  components: {
    Episode,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
