// src/data/ReleasesData.ts

// 1. TypeScript interface for strong typing
export interface ReleaseItem {
  id: string; // Use string for layoutId compatibility
  title: string;
  artist: string;
  description: string;
  image: string; // Path to the image
  audioSrc: string; // Path to audio file
  genre: string;
  year: number;
}

// 2. Exportable releases array
// (Using a few detailed examples, and the rest with titles from our previous work)
export const releases: ReleaseItem[] = [
  { 
    id: '1', 
    title: 'Chaand mera', 
    artist: "February's Favorite",
    description: 'A soulful romantic track about the longing and beauty of the moonlit night.', 
    image: '/bg/Februarys-Favorite/BG 1.png', 
    audioSrc: '/audio/chaand_mera.mp3', // Placeholder
    genre: 'Romantic Ballad', 
    year: 2024 
  },
  { 
    id: '2', 
    title: 'Akele akele', 
    artist: "February's Favorite",
    description: 'A deep introspective ballad exploring themes of solitude and self-discovery.', 
    image: '/bg/Februarys-Favorite/BG 2.png', 
    audioSrc: '/audio/akele_akele.mp3', // Placeholder
    genre: 'Indie', 
    year: 2023 
  },
  { 
    id: '3', 
    title: 'Tu aaja', 
    artist: "February's Favorite",
    description: 'An upbeat track calling for a loved one to return.', 
    image: '/bg/Februarys-Favorite/BG 3.png', 
    audioSrc: '/audio/tu_aaja.mp3', // Placeholder
    genre: 'Pop', 
    year: 2023 
  },
  { 
    id: '4', 
    title: 'Razaa', 
    artist: "February's Favorite",
    description: 'Sufi-inspired melodies about acceptance and destiny.', 
    image: '/bg/Februarys-Favorite/BG 4.png', 
    audioSrc: '/audio/razaa.mp3', // Placeholder
    genre: 'Sufi Rock', 
    year: 2022 
  },
  { 
    id: '5', 
    title: 'Tu kaha hai', 
    artist: "February's Favorite",
    description: 'A haunting track about searching for a lost connection.', 
    image: '/bg/Februarys-Favorite/BG 5.png', 
    audioSrc: '/audio/tu_kaha_hai.mp3', // Placeholder
    genre: 'Ambient', 
    year: 2024 
  },
  { 
    id: '6', 
    title: 'Tere bin hum', 
    artist: "February's Favorite",
    description: 'Exploring life without the other half.', 
    image: '/bg/Februarys-Favorite/pic.png', 
    audioSrc: '/audio/tere_bin_hum.mp3', // Placeholder
    genre: 'Acoustic', 
    year: 2023 
  },
  // --- Adding the rest of the song list with minimal data ---
  { id: '7', title: 'Mere yaara mere', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '8', title: 'Yaha hu main', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '9', title: 'Rangrez piya', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '10', title: 'Kaha ho tum', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '11', title: 'Tere intzaar me', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '12', title: 'Musafir', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '13', title: 'Na jao', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '14', title: 'Em C D G', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '15', title: 'Kho gyi', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '16', title: 'Prem Nagariya', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '17', title: 'Maa', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
  { id: '18', title: 'Bolo Zara', artist: "February's Favorite", description: 'Song description', image: '/bg/Background.png', audioSrc: '/audio/placeholder.mp3', genre: 'Genre', year: 2023 },
];