import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MusicPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  if (!currentTrack) {
    return (
      <div className="bg-player-bg border-t border-border p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Select a song to start playing</p>
      </div>
    );
  }

  return (
    <div className="bg-player-bg border-t border-border p-4">
      <div className="flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover shadow-card"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-medium text-foreground truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className="text-muted-foreground hover:text-primary"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={`text-muted-foreground hover:text-primary ${isShuffled ? 'text-primary' : ''}`}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={onPlayPause}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRepeatMode(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off')}
              className={`text-muted-foreground hover:text-primary ${repeatMode !== 'off' ? 'text-primary' : ''}`}
            >
              <Repeat className="w-4 h-4" />
              {repeatMode === 'one' && (
                <span className="absolute top-1 right-1 w-1 h-1 bg-primary rounded-full"></span>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              onValueChange={handleProgressChange}
              max={currentTrack.duration}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[40px]">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}