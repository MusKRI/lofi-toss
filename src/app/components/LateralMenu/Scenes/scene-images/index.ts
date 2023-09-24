// images
import InsideSun from "./inside_sun.png";
import OutsideSun from "./outside_sun.png";
import OutsideDay from "./Outside_Day.png";
import InsideRain from "./inside_rain.png";

export const scenesList: {
  id: string;
  SceneImage: string;
  Scene: string;
}[] = [
  {
    id: "InsideSun",
    SceneImage: InsideSun,
    Scene: "/videos/inside_sun.mp4",
  },
  {
    id: "OutsideSun",
    SceneImage: OutsideSun,
    Scene: "/videos/outside_sun.mp4",
  },
  {
    id: "OutsideDay",
    SceneImage: OutsideDay,
    Scene: "/videos/Outside_Day.mp4",
  },
  {
    id: "InsideRain",
    SceneImage: InsideRain,
    Scene: "/videos/inside_rain.mp4",
  },
];
