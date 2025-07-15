import { Play, Pause, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: number;
}

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPlay: (track: Track) => void;
  onPause: () => void;
}

export default function TrackCard({
  track,
  isPlaying,
  isCurrentTrack,
  onPlay,
  onPause,
}: TrackCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      onPause();
    } else {
      onPlay(track);
    }
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
      isCurrentTrack 
        ? 'bg-primary/10 border border-primary/30 shadow-glow' 
        : 'hover:bg-gradient-hover hover:shadow-card hover:translate-x-1'
    }`}>
      <div className="relative">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-14 h-14 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-xl backdrop-blur-sm">
          <Button
            onClick={handlePlayPause}
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold truncate transition-colors duration-300 ${
          isCurrentTrack ? 'text-primary' : 'text-foreground group-hover:text-white'
        }`}>
          {track.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground/80">
          {track.artist}
        </p>
        {isCurrentTrack && (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
              <div className="w-1 h-2 bg-primary/70 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-2 bg-primary/70 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            </div>
            <span className="text-xs text-primary font-medium">Playing</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground font-medium tabular-nums">
          {formatDuration(track.duration)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 rounded-full"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}