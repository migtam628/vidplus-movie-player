/**
 * Minimal React example.
 *
 * Install: npm install vidplus-movie-player react
 */

import { MoviePlayer } from 'vidplus-movie-player/react';

export default function MoviePage() {
  return (
    <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>I Am Legend — IMDb ID</h1>

      <MoviePlayer
        type="movie"
        id="tt0480249"
        autoPlay={false}
        theme="E50914"
        sub="en"
        chromecast={false}
        poster
        title
        aspectRatio="16/9"
        titleAttr="I Am Legend — VidUp player"
        style={{ borderRadius: 12, overflow: 'hidden' }}
      />

      <h2 style={{ marginTop: '2rem' }}>TV episode — TMDB ID</h2>

      <MoviePlayer
        type="tv"
        id={1396}
        season={1}
        episode={1}
        autoPlay={false}
        autoNext
        nextButton
        theme="00D4FF"
        titleAttr="TV episode — VidUp player"
      />
    </main>
  );
}
