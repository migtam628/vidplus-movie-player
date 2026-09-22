import { MoviePlayer } from 'vidplus-movie-player/react';

export default function WatchPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <MoviePlayer
        type="tv"
        id={94997}
        season={1}
        episode={1}
        primarycolor="FFD60A"
        autoplay={false}
        titleAttr="VidPlus TV player"
      />
    </main>
  );
}
