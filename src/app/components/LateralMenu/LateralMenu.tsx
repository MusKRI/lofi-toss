
import LiveClock from "./LiveClock/LiveClock";
import MusicController from "./MusicController/MusicController";
import Scenes from "./Scenes/Scenes";

const LateralMenu = () => {
  return (
    <div className="">
      <div
        className="absolute border border-[#414142] left-[17px] bottom-[22px] right-[17px] z-[9999] w-auto h-[52px] rounded-xl backdrop-blur-[42px] text-white flex items-center px-5"
        style={{
          background: "hsla(0,0%,7%,.75)",
        }}
      >
          <LiveClock />

          <div className="flex-1 flex items-center justify-center gap-8">
            <MusicController />
            <Scenes />
          </div>
      </div>
    </div>
  );
};

export default LateralMenu;
