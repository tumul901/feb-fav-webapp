import Hero from '@/components/Hero/Hero';
import Releases from '@/components/Releases/Releases';
import { ServicesHighlight } from '@/components/Services/ServicesHighlight';
import { ArtistSpotlight } from '@/components/Artists/ArtistSpotlight';
import { Tour } from '@/components/Tour/Tour';

export default function Home() {
  return (
    <div>
      <Hero/>
      <Releases/>
      <ServicesHighlight />
      <ArtistSpotlight />
      <Tour />
    </div>
  );
}
