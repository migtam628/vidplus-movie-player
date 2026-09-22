/**
 * Minimal React example (Next.js App Router or CRA)
 *
 * Install: npm install vidplus-movie-player react
 */

import React from 'react';
import { MoviePlayer } from 'vidplus-movie-player/react';

export default function MoviePage() {
  return (
    <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Inception</h1>

      <MoviePlayer
        type="movie"
        id={27205}
        primarycolor="00D4FF"
        secondarycolor="003344"
        iconcolor="FFFFFF"
        autoplay={false}
        poster
        title
        chromecast
        aspectRatio="16/9"
        style={{ borderRadius: 12, overflow: 'hidden' }}
      />

      <h2 style={{ marginTop: '2rem' }}>TV – The Boys S1E1</h2>
      <MoviePlayer
        type="tv"
        id={76479}
        season={1}
        episode={1}
        primarycolor="B20710"
        icons="netflix"
      />
    </main>
  );
}
