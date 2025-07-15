import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import MusicPlayer from "@/components/MusicPlayer";
import TrackCard from "@/components/TrackCard";
import { searchYouTubeMusic, getTrendingMusic, getRecommendations } from "@/services/youtubeApi";
import { Play, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

const Index = () => {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Load trending music on component mount
    const loadInitialData = async () => {
      const trending = await getTrendingMusic();
      const recommended = await getRecommendations();
      setTrendingTracks(trending);
      setRecommendations(recommended.slice(0, 10));
    };
    
    loadInitialData();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchYouTubeMusic(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePauseTrack = () => {
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    // Simple next track logic
    const currentList = searchResults.length > 0 ? searchResults : trendingTracks;
    const currentIndex = currentList.findIndex(track => track.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentTrack(currentList[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    // Simple previous track logic
    const currentList = searchResults.length > 0 ? searchResults : trendingTracks;
    const currentIndex = currentList.findIndex(track => track.id === currentTrack?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentList.length - 1;
    setCurrentTrack(currentList[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <header className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Discover Music
              </h1>
              <SearchBar onSearch={handleSearch} />
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            {searchResults.length > 0 ? (
              /* Search Results */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Search Results
                  </h2>
                  <div className="space-y-2">
                    {searchResults.map((track) => (
                      <TrackCard
                        key={track.id}
                        track={track}
                        isPlaying={isPlaying}
                        isCurrentTrack={currentTrack?.id === track.id}
                        onPlay={handlePlayTrack}
                        onPause={handlePauseTrack}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Home Content */
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="bg-gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome to TuneStream</h2>
                    <p className="text-white/90 mb-6">
                      Discover millions of songs from YouTube. Search, play, and enjoy your favorite music.
                    </p>
                    <Button 
                      variant="secondary" 
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      Start Listening
                    </Button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Trending Music */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trending Now
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trendingTracks.slice(0, 6).map((track) => (
                      <div
                        key={track.id}
                        className="bg-card rounded-lg p-4 shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                        onClick={() => handlePlayTrack(track)}
                      >
                        <div className="relative mb-3">
                          <img
                            src={track.thumbnail}
                            alt={track.title}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              <Play className="w-6 h-6 ml-1" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm mb-1 truncate">{track.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Recommended for You
                  </h2>
                  <div className="space-y-2">
                    {recommendations.map((track) => (
                      <TrackCard
                        key={track.id}
                        track={track}
                        isPlaying={isPlaying}
                        isCurrentTrack={currentTrack?.id === track.id}
                        onPlay={handlePlayTrack}
                        onPause={handlePauseTrack}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Index;
