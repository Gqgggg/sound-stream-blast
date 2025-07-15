import { Home, Search, Library, Plus, Heart, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", icon: Home, current: true },
  { name: "Search", icon: Search, current: false },
  { name: "Your Library", icon: Library, current: false },
];

const playlists = [
  "Liked Songs",
  "Recently Played",
  "My Playlist #1",
  "Chill Vibes",
  "Workout Mix",
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-card border-r border-border flex flex-col h-full backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TuneStream
            </span>
            <div className="text-xs text-muted-foreground">Music for everyone</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 h-11 rounded-xl transition-all duration-300 ${
              item.current 
                ? 'bg-primary/20 text-primary shadow-glow border border-primary/30' 
                : 'hover:bg-muted/50 hover:translate-x-1'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Button>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="px-4 pb-4 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300 hover:translate-x-1"
        >
          <Plus className="w-5 h-5" />
          Create Playlist
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300 hover:translate-x-1"
        >
          <Heart className="w-5 h-5" />
          Liked Songs
        </Button>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-4 pb-4">
        <div className="text-sm font-semibold text-muted-foreground mb-3 px-3 uppercase tracking-wider">
          Playlists
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
          {playlists.map((playlist, index) => (
            <Button
              key={playlist}
              variant="ghost"
              className="w-full justify-start h-9 text-sm text-muted-foreground hover:text-foreground rounded-xl transition-all duration-300 hover:bg-muted/50 hover:translate-x-1"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-primary opacity-60"></div>
                <span className="truncate">{playlist}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}