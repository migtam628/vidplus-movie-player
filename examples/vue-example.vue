<script setup lang="ts">
import { MoviePlayer } from 'vidplus-movie-player/vue';
</script>

<template>
  <main style="max-width: 960px; margin: 2rem auto; padding: 0 1rem">
    <MoviePlayer
      type="movie"
      id="tt0480249"
      :auto-play="false"
      theme="00D4FF"
      sub="en"
      :chromecast="false"
      title-attr="VidUp movie player"
    />
  </main>
</template>
