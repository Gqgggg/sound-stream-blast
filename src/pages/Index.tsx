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
                <div className="bg-gradient-primary rounded-3xl p-10 text-white relative overflow-hidden shadow-elevated">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Now Streaming</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-3 leading-tight">
                      Welcome to <span className="text-accent-glow">TuneStream</span>
                    </h2>
                    <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-md">
                      Discover millions of songs from YouTube. Search, play, and enjoy your favorite music with enhanced audio experience.
                    </p>
                    <Button 
                      variant="secondary" 
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3 font-semibold backdrop-blur-sm"
                    >
                      Start Listening
                    </Button>
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>

                {/* Trending Music */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trending Now
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingTracks.slice(0, 6).map((track, index) => (
                      <div
                        key={track.id}
                        className="bg-gradient-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-all duration-500 group cursor-pointer hover:scale-105 hover:-translate-y-1 animate-fade-in"
                        style={{animationDelay: `${index * 0.1}s`}}
                        onClick={() => handlePlayTrack(track)}
                      >
                        <div className="relative mb-4">
                          <img
                            src={track.thumbnail}
                            alt={track.title}
                            className="w-full aspect-video object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-xl backdrop-blur-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-14 h-14 rounded-full bg-white/90 hover:bg-white text-black transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg"
                            >
                              <Play className="w-7 h-7 ml-1" />
                            </Button>
                          </div>
                          <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm">
                            <span className="text-xs text-white font-medium">
                              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm mb-2 truncate group-hover:text-primary transition-colors duration-300">{track.title}</h3>
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
