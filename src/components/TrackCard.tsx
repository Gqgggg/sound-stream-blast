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
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="relative">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
          <Button
            onClick={handlePlayPause}
            variant="ghost"
            size="sm"
            className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${
          isCurrentTrack ? 'text-primary' : 'text-foreground'
        }`}>
          {track.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {track.artist}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {formatDuration(track.duration)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}