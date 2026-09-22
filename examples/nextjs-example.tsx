import { MoviePlayer } from 'vidplus-movie-player/react';

export default function WatchPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <MoviePlayer
        type="tv"
        id={1396}
        season={1}
        episode={1}
        autoPlay={false}
        autoNext
        nextButton
        theme="FFD60A"
        sub="en"
        titleAttr="VidUp TV player"
      />
    </main>
  );
}
