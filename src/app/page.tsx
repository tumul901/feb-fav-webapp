import Hero from '@/components/Hero/Hero';
import Releases from '@/components/Releases/Releases';
import { ArtistSpotlight } from '@/components/Artists/ArtistSpotlight';

export default function Home() {
  return (
    <div>
      <Hero/>
      <Releases/>
      <ArtistSpotlight />
    </div>
  );
}
