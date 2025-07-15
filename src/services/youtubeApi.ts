// YouTube API service
// To use this, you'll need to get a YouTube Data API v3 key from Google Cloud Console
// For now, we'll use mock data

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

// Mock data for demonstration
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    thumbnail: "https://i.ytimg.com/vi/4NRXx6U8ABQ/mqdefault.jpg",
    duration: 200
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/mqdefault.jpg",
    duration: 234
  },
  {
    id: "3",
    title: "Someone Like You",
    artist: "Adele",
    thumbnail: "https://i.ytimg.com/vi/hLQl3WQQoQ0/mqdefault.jpg",
    duration: 285
  },
  {
    id: "4",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
    duration: 355
  },
  {
    id: "5",
    title: "Hotel California",
    artist: "Eagles",
    thumbnail: "https://i.ytimg.com/vi/09839DpTctU/mqdefault.jpg",
    duration: 391
  }
];

// YouTube API key - you'll need to replace this with your actual API key
const YOUTUBE_API_KEY = "AIzaSyDBQ9OjY2XW8DY7-WpPb6Q2LURnWCzkoAY";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export const searchYouTubeMusic = async (query: string): Promise<Track[]> => {
  // For demonstration purposes, return mock data
  // In a real implementation, you would use the YouTube Data API
  
  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === "AIzaSyDBQ9OjY2XW8DY7-WpPb6Q2LURnWCzkoAY") {
    // Return filtered mock data based on query
    return mockTracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&maxResults=25&q=${encodeURIComponent(query + " music")}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from YouTube API");
    }

    const data = await response.json();
    
    return data.items.map((item: YouTubeVideo) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: Math.floor(Math.random() * 300) + 120 // Mock duration
    }));
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return mockTracks; // Fallback to mock data
  }
};

export const getTrendingMusic = async (): Promise<Track[]> => {
  // Return mock trending data
  return mockTracks;
};

export const getRecommendations = async (): Promise<Track[]> => {
  // Return mock recommendations
  return [...mockTracks].sort(() => Math.random() - 0.5);
};
