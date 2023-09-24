import { create } from "zustand";
import { scenesList } from "../scene-images";
import { StaticImageData } from "next/image";

type HookProps = {
  currentScene: string;
  currentSceneImage: StaticImageData;
  setCurrentSceneImage: (newImage: StaticImageData) => void;
  setCurrentScene: (newScene: string) => void;
  isOpen: boolean;
  onOpenChange: (bool: boolean) => void;
};

export const useScenesModal = create<HookProps>()((set) => ({
  isOpen: false,
  onOpenChange: (bool) => set(() => ({ isOpen: bool })),
  currentScene: "/videos/inside_sun.mp4",
  setCurrentScene: (newScene) => set(() => ({ currentScene: newScene })),
  currentSceneImage: scenesList[0].SceneImage,
  setCurrentSceneImage: (newImage) =>
    set(() => ({ currentSceneImage: newImage })),
}));
