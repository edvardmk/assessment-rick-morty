<template>
  <span class="card__episode" :title="episode.name">{{ episode.episode }}</span>
</template>

<script>
export default {
  name: 'Episode',
  props: ['episode'],
}
</script>

<style>

</style>
