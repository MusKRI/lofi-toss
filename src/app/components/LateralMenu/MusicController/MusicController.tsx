// **** Library Imports ****

// **** Local Imports ****
import Switch from "@/components/Switch/Switch";
import { useMusicLofi } from "@/app/hooks/useMusicLofi";
import PlayLateral from "./components/Play/Play";

const MusicController = () => {
  const { variant, setVariant } = useMusicLofi();

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex flex-row items-center gap-2">
        <span>Lofi</span>
        <Switch value={variant} onValueChange={setVariant} />
        <span>Music</span>
      </div>

      {/* Separator */}
      <span className="h-5 border-l border-[#453932]" />

      <div className="">
        <PlayLateral />
      </div>

      <span className="h-5 border-l border-[#453932]" />
    </div>
  );
};

export default MusicController;
