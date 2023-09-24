"use client";

import { useScenesModal } from "../LateralMenu/Scenes/hooks/useScenesModal";

const BackgroundVideo = () => {
  const { currentScene, currentSceneImage } = useScenesModal();

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute h-screen min-w-[100vw] min-h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[187vh]">
        <img
          src={currentSceneImage}
          alt="Backup"
          className="z-[-10] scale-[1.001]"
        />
        <video
          className="absolute min-w-[100vw] min-h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[187vh] scale-[1.001]"
          autoPlay={true}
          loop={true}
          muted
          src={currentScene}
        ></video>
      </div>
    </div>
  );
};

export default BackgroundVideo;
