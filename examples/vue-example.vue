<script setup lang="ts">
import { MoviePlayer } from 'vidplus-movie-player/vue';
</script>

<template>
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <MoviePlayer
      type="movie"
      :id="27205"
      primarycolor="00D4FF"
      :autoplay="false"
      title-attr="VidPlus movie player"
    />
  </main>
</template>
