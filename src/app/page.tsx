import Hero from '@/components/Hero/Hero';
import Releases from '@/components/Releases/Releases';
import { ArtistSpotlight } from '@/components/Artists/ArtistSpotlight';
import { Tour } from '@/components/Tour/Tour';
import { Contact } from '@/components/Contact/Contact';

export default function Home() {
  return (
    <div>
      <Hero/>
      <Releases/>
      <ArtistSpotlight />
      <Tour />
      <Contact />
    </div>
  );
}
