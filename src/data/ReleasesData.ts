// src/data/ReleasesData.ts

// 1. TypeScript interface for strong typing
export interface ReleaseItem {
  id: string; // Use string for layoutId compatibility
  title: string;
  description: string;
  image: string; // Path to the image
  genre: string;
  year: number;
}

// 2. Exportable releases array
// (Using a few detailed examples, and the rest with titles from our previous work)
export const releases: ReleaseItem[] = [
  { 
    id: '1', 
    title: 'Chaand mera', 
    description: 'A soulful romantic track about the longing and beauty of the moonlit night.', 
    image: '/bg/Februarys-Favorite/BG 1.png', // Placeholder image
    genre: 'Romantic Ballad', 
    year: 2024 
  },
  { 
    id: '2', 
    title: 'Akele akele', 
    description: 'A deep introspective ballad exploring themes of solitude and self-discovery.', 
    image: '/bg/Februarys-Favorite/BG 2.png', // Placeholder image
    genre: 'Indie', 
    year: 2023 
  },
  { 
    id: '3', 
    title: 'Tu aaja', 
    description: 'An upbeat track calling for a loved one to return.', 
    image: '/bg/Februarys-Favorite/BG 3.png', // Placeholder image
    genre: 'Pop', 
    year: 2023 
  },
  { 
    id: '4', 
    title: 'Razaa', 
    description: 'Sufi-inspired melodies about acceptance and destiny.', 
    image: '/bg/Februarys-Favorite/BG 4.png', // Placeholder image
    genre: 'Sufi Rock', 
    year: 2022 
  },
  { 
    id: '5', 
    title: 'Tu kaha hai', 
    description: 'A haunting track about searching for a lost connection.', 
    image: '/bg/Februarys-Favorite/BG 5.png', // Placeholder image
    genre: 'Ambient', 
    year: 2024 
  },
  { 
    id: '6', 
    title: 'Tere bin hum', 
    description: 'Exploring life without the other half.', 
    image: '/bg/Februarys-Favorite/pic.png', // Placeholder image
    genre: 'Acoustic', 
    year: 2023 
  },
  // --- Adding the rest of the song list with minimal data ---
  { id: '7', title: 'Mere yaara mere', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '8', title: 'Yaha hu main', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '9', title: 'Rangrez piya', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '10', title: 'Kaha ho tum', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '11', title: 'Tere intzaar me', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '12', title: 'Musafir', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '13', title: 'Na jao', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '14', title: 'Em C D G', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '15', title: 'Kho gyi', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '16', title: 'Prem Nagariya', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '17', title: 'Maa', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
  { id: '18', title: 'Bolo Zara', description: 'Song description', image: '/bg/Background.png', genre: 'Genre', year: 2023 },
];