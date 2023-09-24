import { create } from "zustand";
import { type Howl } from "howler";

type HookProps = {
  variant: string;
  setVariant: (newVariant: string) => void;
};

type UsePlayerHookProps = {
  currentTrack: string;
  setCurrentTrack: (newTrack: string) => void;
  playing: boolean;
  setPlaying: (bool: boolean) => void;
  selectedHowl: Howl | null;
  setSelectedHowl: (newHowl: Howl) => void;
  volume: number;
  setVolume: (level: number) => void;
  reset: () => void;
};

export const useMusicLofi = create<HookProps>()((set) => ({
  variant: "Lofi",
  setVariant: (newVariant) =>
    set(() => ({
      variant: newVariant,
    })),
}));

export const usePlayer = create<UsePlayerHookProps>()((set) => ({
  currentTrack: "",
  setCurrentTrack: (newTrack) => set(() => ({ currentTrack: newTrack })),
  playing: false,
  setPlaying: (bool) => set(() => ({ playing: bool })),
  selectedHowl: null,
  setSelectedHowl: (newHowl) => set(() => ({ selectedHowl: newHowl })),
  volume: 50,
  setVolume: (level) => set(() => ({ volume: level })),
  reset: () =>
    set(() => ({
      playing: false,
      selectedHowl: null,
      volume: 50,
    })),
}));
