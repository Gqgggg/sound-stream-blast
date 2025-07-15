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
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">TuneStream</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "secondary" : "ghost"}
            className="w-full justify-start gap-3 h-10"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Button>
        ))}
      </nav>

      {/* Create Playlist */}
      <div className="px-4 pb-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-5 h-5" />
          Create Playlist
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground"
        >
          <Heart className="w-5 h-5" />
          Liked Songs
        </Button>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-4 pb-4">
        <div className="text-sm font-medium text-muted-foreground mb-2 px-2">
          Playlists
        </div>
        <div className="space-y-1">
          {playlists.map((playlist) => (
            <Button
              key={playlist}
              variant="ghost"
              className="w-full justify-start h-8 text-sm text-muted-foreground hover:text-foreground"
            >
              {playlist}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}